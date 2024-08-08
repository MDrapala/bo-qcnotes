import ModalRender from "@/components/Modal"
import { toastNotification } from "@/components/toast"
import { updateEtablishement } from "@/lib/firebase/etablishements"

const myFormSchool = [
  {
    label: "Nom",
    name: "name",
    placeholder: "Nom de l'école",
    required: true,
    isPublic: false,
    className: "col-span-3"
  },
  {
    label: "Adresse",
    name: "address",
    placeholder: "Adresse",
    required: false,
    isPublic: false
  },
  {
    label: "Ville",
    name: "city",
    placeholder: "Ville",
    required: false,
    isPublic: false
  },
  {
    label: "Code postal",
    name: "postalCode",
    placeholder: "Code postal",
    required: false,
    isPublic: false
  }
]

const UpdateEtablishement = ({
  openModal,
  setOpenModal,
  register,
  loadEtablishementById,
  handleSubmit,
  errors
}: any) => {
  const onSubmit = async (data: any) => {
    const school = await updateEtablishement(data.id, {
      ...data
    })
    if (school) {
      toastNotification("La établissement a été ajouté avec succèes", {
        type: "success"
      })
      setOpenModal(false)
      loadEtablishementById(data.id)
    }
  }

  return (
    <ModalRender
      openModal={openModal}
      setOpenModal={setOpenModal}
      className="animate-in slide-in-from-bottom flex justify-center absolute top-[25%] lg:w-[calc(100%-1100px)] md:w-[calc(100%-300px)] sm:w-[calc(100%-200px)] xs:w-full left-[25%] py-3 max-h-[1000px] bg-white rounded-md shadow-lg"
    >
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-center text-neutral-base font-sans font-semibold text-base uppercase">
          Créer une nouvelle classe
        </h1>
        <div className="flex w-full items-center mt-12">
          <div className="grid grid-cols-3 gap-4 mb-5">
            {myFormSchool.map((item) => (
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
                <input
                  type="text"
                  id={item.name}
                  placeholder={item.placeholder}
                  {...register(item.name, { required: true })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            ))}
            <div className="items-center">
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalRender>
  )
}

export default UpdateEtablishement
