import ModalRender from "@/components/Modal"
import { getClasseList } from "@/lib/firebase/classes"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { addStudent } from "@/lib/firebase/students"
import { toastNotification } from "@/components/toast"

const formStudent = [
  {
    label: "Classes",
    name: "classe.id",
    placeholder: "1SVT1",
    required: true,
    isSelected: true,
    isPublic: false,
    className: "col-span-3"
  },
  {
    label: "Nom de l'étudiant (ex: MDrapala)",
    name: "name",
    placeholder: "MDrapala",
    required: true,
    isPublic: false,
    className: "col-span-3"
  },
  {
    label: "Code de l'étudiant(e)",
    name: "code",
    placeholder: "Sd5fE",
    required: true,
    isCode: true,
    isPublic: false,
    className: "col-span-3"
  }
]

const CreateStudent = ({
  openModal,
  setOpenModal,
  classe,
  refresh,
  isNew
}: any) => {
  const [classeList, setClasseList] = useState<any>([])

  const [userCode, setUserCode] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleGenere = () => {
    const code = Math.random().toString(36).substring(7).toString()
    setUserCode(code)
  }

  const onSubmit = async (data: any) => {
    const classeFilter = classeList.filter(
      (item: any) => item.id === data.classe.id
    )[0]

    const student = await addStudent({
      ...data,
      code: userCode,
      classe: {
        id: classe?.id || classeFilter.id,
        name: classe?.name || classeFilter.name
      },
      etablishement: {
        id: classe?.etablishement.id || classeFilter.etablishement.id,
        name: classe?.etablishement.name || classeFilter.etablishement.name
      },
      created_at: new Date()
    })
    if (student) {
      toastNotification("L'étudiant(e) a été ajouté avec succèes", {
        type: "success"
      })
      refresh(classe?.id || classeFilter.id)
      setOpenModal(false)
    }
  }

  const loadClasses = async () => {
    const ClasseList = await getClasseList(1000)
    setClasseList(ClasseList)
  }

  useEffect(() => {
    handleGenere()
    if (classe === undefined) loadClasses().catch((err) => console.error(err))
  }, [])

  return (
    <ModalRender
      openModal={openModal}
      setOpenModal={setOpenModal}
      className="animate-in slide-in-from-bottom flex justify-center absolute top-[18%] left-[30%] lg:w-[calc(100%-800px)] md:w-[calc(100%-300px)] sm:w-[calc(100%-200px)] xs:w-full max-h-[1000px] bg-white rounded-md shadow-lg"
    >
      <div className="flex-col items-center mx-auto w-96">
        <h1 className="text-center text-neutral-base font-sans font-semibold text-base uppercase">
          <i>
            {classe?.name && `${classe?.etablishement?.name} - ${classe?.name}`}
          </i>
          <br />
          Ajouter un(e) étudiant(e)
        </h1>
        <div className="flex w-full items-center mt-8">
          <div className="grid grid-cols-1 w-full mb-5">
            {formStudent.map((item) =>
              isNew && item.isSelected ? (
                <div key={item.name} className={`mb-5 ${item.className}`}>
                  <label
                    htmlFor={item.name}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    {item.label}
                    {item.isPublic && "(sera pas affiché au éleves)"}
                    <span className="text-red-500">
                      {errors[item.name] && <span>This field is required</span>}
                    </span>
                  </label>
                  <select
                    {...register(item.name, { required: true })}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    {classeList.map((s: any) => (
                      <option value={s.id}>
                        {s?.etablishement?.name} - {s?.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : item.isCode ? (
                <div key={item.name} className={`mb-5 ${item.className}`}>
                  <label
                    htmlFor={item.name}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    {item.label}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      disabled
                      value={userCode}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <button
                      className="bg-blue-800 px-4 py-2 rounded text-white"
                      onClick={() => handleGenere()}
                    >
                      Générer
                    </button>
                  </div>

                  {errors.name && <span>This field is required</span>}
                </div>
              ) : (
                !item.isSelected && (
                  <div key={item.name} className={`mb-5 ${item.className}`}>
                    <label
                      htmlFor={item.name}
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      {item.label}{" "}
                      {item.isPublic && "(sera pas affiché au éleves)"}
                      <span className="text-red-500">
                        {errors[item.name] && (
                          <span>This field is required</span>
                        )}
                      </span>
                    </label>
                    <input
                      type="text"
                      id={item.name}
                      placeholder={item.placeholder}
                      {...register(item.name, { required: true })}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                )
              )
            )}
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Ajouter un(e) étudiant(e)
            </button>
          </div>
        </div>
      </div>
    </ModalRender>
  )
}

export default CreateStudent
