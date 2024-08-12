import { Metadata } from "next"
import Layout from ".."
import { useEffect, useState } from "react"
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import Table from "@/components/Tables"
import { HEADER_STUDENTS_ROW } from "@/constants/tables"
import { addClasse } from "@/lib/firebase/classes"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import CreateStudent from "./Modal/create"
import StudentRows from "@/components/Rows/students"
import { getStudentList } from "@/lib/firebase/students"

const metadata: Metadata = {
  title: "Students"
}

const StudentPage = () => {
  const [studentsList, setStudentsList] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const loadStudents = async () => {
    const studentList = await getStudentList(1000)
    setStudentsList(studentList)
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
      loadStudents()
      setOpenModal(false)
    }
  }

  useEffect(() => {
    loadStudents().catch((err) => console.error(err))
  }, [])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/dashboard" name="home" active={false} />
          <BreadCrumbs url="/students" name="Étudiant(e)s" active={false} />
        </div>
        <div className="flex justify-between items-center mt-10 mb-5">
          <h1 className="text-3xl font-bold">Mes étudiant(e)s</h1>
          <Button
            status="CREATE"
            variant="default"
            className="bg-indigo-400 hover:bg-indigo-600"
            onClick={() => setOpenModal(true)}
          >
            Ajouter un(e) étudiant(e)
          </Button>
        </div>

        <Table
          refresh={loadStudents}
          header={HEADER_STUDENTS_ROW}
          rows={StudentRows}
          dataT={studentsList}
        />
      </div>

      <CreateStudent
        openModal={openModal}
        setOpenModal={setOpenModal}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        refresh={loadStudents}
        isNew={true}
      />
    </Layout>
  )
}

export default StudentPage
