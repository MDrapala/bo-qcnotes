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

  // const [qcnotesList, setQCNotesList] = useState<any>([])
  // const [qcnotesTestList, setQCNotesTestList] = useState<any>([])
  // const [openModal, setOpenModal] = useState<boolean>(false)

  // const [userCode, setUserCode] = useState<string>("")
  // const {
  //   register,
  //   reset,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm()

  // const handleGenere = () => {
  //   const code = Math.random().toString(36).substring(7).toString()
  //   setUserCode(code)
  // }

  // const loadQCNotes = async () => {
  //   const qcnotesList = await getQCNotesList(100)
  //   setQCNotesList(qcnotesList)
  // }
  // const loadQCNotesTest = async () => {
  //   const qcnotesList = await getQCNotesTestList(100)
  //   setQCNotesTestList(qcnotesList)
  // }

  // const handleDeleteMedia = async () => {
  //   if (
  //     confirm("Are you sure you want to delete this classe into the database?")
  //   ) {
  //     toastNotification(`Media DELETED ${classe.id}`, {
  //       type: "success"
  //     })
  //   }
  // }

  // const onSubmit = async (data: any) => {
  //   const addStudent = await addUser({
  //     ...data,
  //     code: userCode,
  //     class_id: classeId,
  //     created_at: new Date()
  //   })
  //   if (addStudent) {
  //     toastNotification("L'étudiant a été ajouté avec succèes", {
  //       type: "success"
  //     })
  //     handleGenere()
  //     reset()
  //     getClasseList(classeId)
  //   }
  // }

  // useEffect(() => {
  //   loadQCNotesTest().catch((err) => console.error(err))
  // }, [openModal])

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
      {/* <ModalRender
        openModal={openModal}
        setOpenModal={setOpenModal}
        className="animate-in slide-in-from-bottom flex justify-center absolute top-[25%] lg:w-[calc(100%-1000px)] md:w-[calc(100%-400px)] sm:w-[calc(100%-200px)] xs:w-full left-[35%] py-3 max-h-[1000px] bg-white rounded-md shadow-lg"
      >
        <QCNotesTests
          qcnotesList={qcnotesList}
          classId={classId}
          setOpenModal={setOpenModal}
        />
      </ModalRender> */}

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
