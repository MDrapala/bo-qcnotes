import { Metadata } from "next"
import Layout from ".."
import { useEffect, useState } from "react"
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import Table from "@/components/Tables"
import ClassesRows from "@/components/Rows/classes"
import { HEADER_CLASSES_ROW } from "@/constants/tables"
import { addClasse, getClasseList } from "@/lib/firebase/classes"
import ModalRender from "@/components/Modal"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"

const metadata: Metadata = {
  title: "Classes"
}

const ClassesPage = () => {
  const [classesList, setClassesList] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const loadClasses = async () => {
    const classeList = await getClasseList(1000)
    setClassesList(classeList)
  }

  const onSubmit = async (data: any) => {
    const addStudent = await addClasse({
      ...data,
      created_at: new Date()
    })
    if (addStudent) {
      toastNotification("La classe a été ajouté avec succèes", {
        type: "success"
      })
      reset()
      loadClasses()
      setOpenModal(false)
    }
  }

  useEffect(() => {
    loadClasses().catch((err) => console.error(err))
  }, [])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/dashboard" name="home" active={false} />
          <BreadCrumbs url="/classes" name="Classes" active={false} />
        </div>
        <div className="flex justify-end my-12 w-full">
          <Button
            variant="default"
            className="bg-blue-400 hover:bg-blue-600"
            onClick={() => setOpenModal(true)}
          >
            Créer une classe
          </Button>
        </div>
        <Table
          header={HEADER_CLASSES_ROW}
          rows={ClassesRows}
          dataT={classesList}
        />
      </div>

      <ModalRender
        openModal={openModal}
        setOpenModal={setOpenModal}
        className="animate-in slide-in-from-bottom flex justify-center absolute top-[25%] lg:w-[calc(100%-1100px)] md:w-[calc(100%-300px)] sm:w-[calc(100%-200px)] xs:w-full left-[25%] py-3 max-h-[1000px] bg-white rounded-md shadow-lg"
      >
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-center text-neutral-base font-sans font-semibold text-base uppercase">
            CREATION d'une nouvelle ecole
          </h1>
          <div className="mt-5 mx-8">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nom{" "}
                <span className="text-red-500">
                  {errors.name && <span>le champ est requis</span>}
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Standford University"
                {...register("name", { required: true })}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 rounded text-white px-3 w-full py-2"
              onClick={handleSubmit(onSubmit)}
            >
              Créer
            </button>
          </div>
        </div>
      </ModalRender>
    </Layout>
  )
}

export default ClassesPage
