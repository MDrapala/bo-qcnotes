import ModalRender from "@/components/Modal"
import { toastNotification } from "@/components/toast"
import { addClasse } from "@/lib/firebase/classes"
import { getEtablishementList } from "@/lib/firebase/etablishements"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const formClasse = [
  {
    label: "Etablissement",
    name: "etablishement.id",
    placeholder: "Lycée de la ville",
    required: true,
    isSelected: true,
    isPublic: false,
    className: "col-span-3"
  },
  {
    label: "Classe",
    name: "name",
    placeholder: "1SVT3",
    required: true,
    isPublic: false,
    className: "col-span-3"
  }
]

const CreateClasse = ({
  openModal,
  setOpenModal,
  etablishement,
  refresh,
  isNew
}: any) => {
  const [etablishementList, setEtablishementList] = useState<any>([])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
    const etablishementFilter = etablishementList.filter(
      (item: any) => item.id === data.etablishement.id
    )[0]

    const addStudent = await addClasse({
      ...data,
      etablishement: {
        id: etablishement?.id || etablishementFilter.id,
        name: etablishement?.name || etablishementFilter.name
      },
      created_at: new Date()
    })
    if (addStudent) {
      toastNotification("La classe a été ajouté avec succèes", {
        type: "success"
      })
      refresh(etablishement?.id || etablishementFilter.id)
      setOpenModal(false)
    }
  }

  const loadEtablishements = async () => {
    const etablishementList = await getEtablishementList(1000)
    setEtablishementList(etablishementList)
  }

  useEffect(() => {
    if (isNew) {
      loadEtablishements().catch((err) => console.error(err))
    }
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
            {" "}
            {etablishement?.name &&
              `${etablishement?.type} - ${etablishement?.name}`}
          </i>
          <br />
          Ajouter une nouvelle classe
        </h1>
        <div className="flex w-full items-center mt-8">
          <div className="grid grid-cols-1 w-full mb-5">
            {formClasse.map((item) =>
              !item ? (
                "Chargement"
              ) : (
                <div className={`mb-5 ${item.className}`}>
                  <label
                    htmlFor={item.name}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    {item.label}{" "}
                    {item.isPublic && "(sera pas affiché au éleves)"}
                    <span className="text-red-500">
                      {errors[item.name] && <span>This field is required</span>}
                    </span>
                  </label>
                  {isNew && item.isSelected ? (
                    <select
                      {...register(item.name, { required: true })}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      {etablishementList.map((s: any) => (
                        <option value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={item.name}
                      placeholder={item.placeholder}
                      {...register(item.name, { required: true })}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  )}
                </div>
              )
            )}
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Ajouter la nouvelle classe
            </button>
          </div>
        </div>
      </div>
    </ModalRender>
  )
}

export default CreateClasse
