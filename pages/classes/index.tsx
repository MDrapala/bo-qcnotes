import { Metadata } from "next"
import Layout from ".."
import { useEffect, useState } from "react"
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import Table from "@/components/Tables"
import ClassesRows from "@/components/Rows/classes"
import { HEADER_CLASSES_ROW } from "@/constants/tables"
import { addClasse, getClasseList } from "@/lib/firebase/classes"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import CreateClasse from "./modal/create"

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
            status="CREATE"
            variant="default"
            className="bg-indigo-400 hover:bg-indigo-600"
            onClick={() => setOpenModal(true)}
          >
            Créer une classe
          </Button>
        </div>
        <Table
          refresh={loadClasses}
          header={HEADER_CLASSES_ROW}
          rows={ClassesRows}
          dataT={classesList}
        />
      </div>

      <CreateClasse
        openModal={openModal}
        setOpenModal={setOpenModal}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        refresh={loadClasses}
        isNew={true}
      />
    </Layout>
  )
}

export default ClassesPage
