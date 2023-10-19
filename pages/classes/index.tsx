import { Metadata } from "next"
import Layout from ".."
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import Table from "@/components/Tables"
import ClassesRows from "@/components/Rows/classes"
import { HEADER_CLASSES_ROW } from "@/constants/tables"
import { getClasseList } from "@/lib/firebase/classes"

const metadata: Metadata = {
  title: "Students"
}

const ClassesPage = () => {
  const [classesList, setClassesList] = useState<any>([])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const loadClasses = async () => {
    const classeList = await getClasseList(1000)
    setClassesList(classeList)
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
          <Button variant="default" className="bg-blue-400 hover:bg-blue-600">
            Créer une classe
          </Button>
        </div>
        <Table
          header={HEADER_CLASSES_ROW}
          rows={ClassesRows}
          dataT={classesList}
        />
      </div>
    </Layout>
  )
}

export default ClassesPage
