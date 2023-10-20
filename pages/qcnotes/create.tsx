import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useForm } from "react-hook-form"
import QcmPage from "@/components/QCM"

const metadata: Metadata = {
  title: "QC Notes"
}

const CreateQCNotes = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/qcnotes" name="QC Notes" active={true} />
          <BreadCrumbs
            url="/qcnotes/create"
            name="Créer un QC Notes"
            active={false}
          />
        </div>
        <div className="flex justify-between w-full items-center mt-12">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nom du QC Notes (ce titre sera affiché au étudiants)
              <span className="text-red-500">
                {errors.name && <span>This field is required</span>}
              </span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Sortie au chateau de versailles"
              {...register("title", { required: true })}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="note"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Le QC Notes sera note sur ?
              <span className="text-red-500">
                {errors.name && <span>This field is required</span>}
              </span>
            </label>
            <input
              type="number"
              id="note"
              placeholder="10"
              {...register("note", { required: true })}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        {/* exp  */}
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-2xl mt-12">Mes Questions</h1>
            <div className="">
              <QcmPage />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateQCNotes
