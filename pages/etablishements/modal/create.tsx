import ModalRender from "@/components/Modal"
import { toastNotification } from "@/components/toast"
import { addEtablishement } from "@/lib/firebase/etablishements"
import { useForm } from "react-hook-form"

const formEtablishement = [
  {
    label: "Nom",
    name: "name",
    placeholder: "Nom de l'établissement",
    required: true,
    isPublic: false,
    className: "col-span-3"
  },
  {
    label: "Type d'établissement",
    name: "type",
    placeholder: "Type d'établissement",
    required: true,
    isPublic: false,
    className: "col-span-3",
    isSelect: true,
    suggested: ["Lycée", "Collège"]
  }
]

const ModalCreateEtablishement = ({
  openModal,
  setOpenModal,
  loadEtablishements
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: any) => {
    const addStudent = await addEtablishement({
      ...data,
      created_at: new Date()
    })
    if (addStudent) {
      toastNotification("La établissement a été ajouté avec succèes", {
        type: "success"
      })
      await loadEtablishements()
      setOpenModal(false)
    }
  }

  return (
    <ModalRender
      openModal={openModal}
      setOpenModal={setOpenModal}
      className="animate-in slide-in-from-bottom flex justify-center absolute top-[18%] left-[30%] lg:w-[calc(100%-800px)] md:w-[calc(100%-300px)] sm:w-[calc(100%-200px)] xs:w-full max-h-[1000px] bg-white rounded-md shadow-lg"
    >
      <div className="flex-col items-center mx-auto w-96">
        <h1 className="text-center text-neutral-base font-sans font-semibold text-base uppercase">
          Créer un nouvel établissement
        </h1>
        <div className="flex w-full items-center mt-8">
          <div className="grid grid-cols-1 w-full mb-5">
            {formEtablishement.map((item) => (
              <div className={`mb-5 ${item.className}`}>
                <label
                  htmlFor={item.name}
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  {item.label} {item.isPublic && "(sera pas affiché au éleves)"}
                  <span className="text-red-500">
                    {errors[item.name] && <span>This field is required</span>}
                  </span>
                </label>
                {item.isSelect ? (
                  <select
                    {...register(item.name)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    {item.suggested.map((s) => (
                      <option value={s}>{s}</option>
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
            ))}
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Créer un nouvel établissement
            </button>
          </div>
        </div>
      </div>
    </ModalRender>
  )
}

export default ModalCreateEtablishement
