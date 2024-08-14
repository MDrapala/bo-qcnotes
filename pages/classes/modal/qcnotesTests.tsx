import { toastNotification } from "@/components/toast"
import { addQCNotesTest } from "@/lib/firebase/qcNotesTests"
import { useForm } from "react-hook-form"

const QCNotesTests = ({
  qcnotesList,
  classId,
  setOpenModal
}: {
  qcnotesList: []
  classId: string
  setOpenModal: any
}) => {
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleSelectChange = (e: any) => {
    console.log("ok")
    setValue("qcnotesId", e.target.value)
  }

  const onSubmit = async (data: any) => {
    console.log({ data })
    // TODO: get qcnotes by id
    // const qcnotes = await getQCNotesById(data.qcnotesId)
    //  console.log({ data, qcnotes })
    const result = {
      ...data,
      classId: classId,
      created_at: new Date()
    }
    const add = await addQCNotesTest(result)
    if (add) {
      toastNotification("Le QCNotes a été ajouté avec succèes", {
        type: "success"
      })
      setOpenModal(false)
      reset()
    }
  }

  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-center text-neutral-base font-sans font-semibold text-base uppercase">
        Nouveau QCNotes
      </h1>
      <div className="mt-5 mx-8">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Date de départ{" "}
            <span className="text-red-500">
              {errors.dateStart && <span>le champ est requis</span>}
            </span>
          </label>
          <input
            type="datetime-local"
            {...register("dateStart", { required: true, valueAsDate: true })}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            QCNotes
            <span className="text-red-500">
              {errors.name && <span>le champ est requis</span>}
            </span>
          </label>
          <select
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            value={getValues().qcnotesId}
            onChange={(e) => handleSelectChange(e)}
          >
            {qcnotesList.map((option: any, index: any) => (
              <option key={index} value={option.id}>
                {option.title.length > 34
                  ? option.title.substr(0, 34) + "..."
                  : option.title}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 rounded text-white px-3 w-full py-2"
          onClick={handleSubmit(onSubmit)}
        >
          Lancer le QCNotes
        </button>
      </div>
    </div>
  )
}

export default QCNotesTests
