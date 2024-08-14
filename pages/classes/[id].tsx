import { cx } from "class-variance-authority"
import { Metadata } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutPage from "@/pages"
import BreadCrumbs from "@/components/BreadCrumb"
import Loading from "@/components/loading"
import { deleteClasse, getClasseById } from "@/lib/firebase/classes"
import { Button } from "@/components/Button"
import Table from "@/components/Tables"
import { HEADER_STUDENTS_ROW } from "@/constants/tables"
import StudentRows from "@/components/Rows/students"
import { toastNotification } from "@/components/toast"
import CreateStudent from "../students/Modal/create"
import { getStudentsByClasseId } from "@/lib/firebase/students"

const ClassDetailsPage = () => {
  const router = useRouter()
  const classeId = router.query.id as string

  const [openModalStudent, setOpenModalStudent] = useState<boolean>(false)
  const [classe, setClasse] = useState<any>()
  const [studentList, setStudentList] = useState<any>([])

  const metadata: Metadata = {
    title: `${classe?.etablishement?.name} - ${classe?.name}`
  }

  const getClasseList = async (classId: string) => {
    const classeList = await getClasseById(classId)
    setClasse(classeList)
  }

  const loadStudentsByClasseId = async (classeId: string) => {
    const studentList = await getStudentsByClasseId(classeId)
    setStudentList(studentList)
  }

  const handleDeleteClasse = async (classeId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer la classe ?")) {
      await deleteClasse(classeId, { deleted_at: new Date() })
      toastNotification(`La classe a bien été supprimée !`, {
        type: "success"
      })
    }
  }

  useEffect(() => {
    getClasseList(classeId).catch((error: TypeError) => console.error(error))
    loadStudentsByClasseId(classeId).catch((err) => console.error(err))
  }, [classeId])

  return classe ? (
    <LayoutPage props={metadata}>
      <div className="w-full md:mx-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className={cx("flex flex-col w-full")}>
            <div className={cx("flex flex-row items-center gap-4", "mt-5")}>
              <BreadCrumbs url="/" name="home" active={true} />
              <BreadCrumbs url="/classes" name="Classes" active={true} />
              <BreadCrumbs
                url={`/classes/${classe.name}`}
                name={`${classe.etablishement.name} - ${classe.name}`}
                active={false}
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div className={`px-2 py-1 rounded-xl w-full`}>
                <div className="mt-12">
                  <div className="mb-12">
                    <h3 className="font-bold text-2xl">{classe.name}</h3>
                    <span>{classe.etablishement.name}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl w-full">
                <div className="flex items-center justify-end gap-4 sticky">
                  <Button
                    variant="default"
                    status="EDIT"
                    className="bg-indigo-500 hover:bg-indigo-700"
                    // onClick={() => setOpenModal(true)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="default"
                    status="DELETE"
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => handleDeleteClasse(classeId)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 mb-12">
          <div className="flex justify-end my-12 w-full">
            <Button
              status="CREATE"
              variant="default"
              className="bg-indigo-400 hover:bg-indigo-600"
              onClick={() => setOpenModalStudent(true)}
            >
              Ajouter un(e) étudiant(e)
            </Button>
          </div>
          <Table
            refresh={() => {}}
            header={HEADER_STUDENTS_ROW}
            rows={StudentRows}
            dataT={studentList}
          />
        </div>
      </div>

      <CreateStudent
        openModal={openModalStudent}
        setOpenModal={setOpenModalStudent}
        classe={classe}
        refresh={loadStudentsByClasseId}
      />
    </LayoutPage>
  ) : (
    <Loading />
  )
}

export default ClassDetailsPage
