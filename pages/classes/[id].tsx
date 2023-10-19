import { cx } from "class-variance-authority"
import { Metadata } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import LayoutPage from "@/pages"
import BreadCrumbs from "@/components/BreadCrumb"
import { Button } from "@/components/Button"
import Loading from "@/components/loading"
import { toastNotification } from "@/components/toast"
import { getClasseById } from "@/lib/firebase/classes"
import ClasseStudentRows from "@/components/Rows/students"
import Table from "@/components/Tables"
import { HEADER_CLASSES_STUDENTS_ROW } from "@/constants/tables"
import { updateUser } from "@/lib/firebase/users"

const ClassDetailsPage = () => {
  const router = useRouter()
  const classId = router.query.id as string
  const [classe, setClasse] = useState<any>()
  const [userCode, setUserCode] = useState<string>("")
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const metadata: Metadata = {
    title: `${classe?.name ? classe?.name + " - " : ""} ${classe?.id}`
  }

  const handleGenere = () => {
    const code = Math.random().toString(36).substring(7).toString()
    setUserCode(code)
  }

  const getClasseList = async (classId: string) => {
    const classeList = await getClasseById(classId)
    setClasse(classeList)
  }

  const handleDeleteMedia = async () => {
    if (
      confirm("Are you sure you want to delete this classe into the database?")
    ) {
      toastNotification(`Media DELETED ${classe.id}`, {
        type: "success"
      })
    }
  }

  const onSubmit = async (data: any) => {
    const addStudent = await updateUser(userCode, {
      ...data,
      code: userCode,
      class_id: classId,
      created_at: new Date()
    })
    if (addStudent) {
      toastNotification("L'étudiant a été ajouté avec succèes", {
        type: "success"
      })
      handleGenere()
      reset()
      getClasseList(classId)
    }
  }

  useEffect(() => {
    getClasseList(classId).catch((error: TypeError) => console.error(error))
    handleGenere()
  }, [classId])

  return classe ? (
    <LayoutPage props={metadata}>
      <div className="w-full md:mx-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className={cx("flex flex-col w-full")}>
            <div className={cx("flex flex-row items-center gap-4", "mt-5")}>
              <BreadCrumbs url="/" name="home" active={true} />
              <BreadCrumbs url="/classes" name="Classes" active={true} />
              <BreadCrumbs
                url={`/movies/${classe.name}`}
                name={`${classe.id} - ${classe.name}`}
                active={false}
              />
            </div>
            <div className={`px-2 py-1 rounded-xl w-full`}>
              <div className="mt-12">
                <div className="mb-12">
                  <h3 className="font-bold text-2xl">{classe.name}</h3>
                  <span>{classId}</span>
                </div>
                <div className="flex gap-5">
                  <div className="border rounded p-5">
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        PNom{" "}
                        <span className="text-red-500">
                          {errors.name && <span>This field is required</span>}
                        </span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="MDrapala"
                        {...register("name", { required: true })}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="userCode"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Code de l'étudiant
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="userCode"
                          id="userCode"
                          disabled
                          value={userCode}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <button
                          className="bg-blue-800 px-4 py-2 rounded text-white"
                          onClick={() => handleGenere()}
                        >
                          Nouveau
                        </button>
                      </div>

                      {errors.name && <span>This field is required</span>}
                    </div>
                    <button
                      className="bg-green-500 hover:bg-green-600 rounded text-white px-3 w-full py-2"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Ajouter un(e) étudiant(e)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 py-4 rounded-xl w-full mt-12">
            <div className="flex-col sticky top-10">
              <div className="flex gap-4 justify-between mb-12">
                <Button
                  variant="default"
                  status="DELETE"
                  className="bg-red-500"
                  onClick={() => handleDeleteMedia()}
                >
                  Supprimer la Classe
                </Button>
              </div>
              <div className="p-4 border border-neutral-50 rounded-lg mt-4 mb-5 sticky top-24">
                <Table
                  header={HEADER_CLASSES_STUDENTS_ROW}
                  rows={ClasseStudentRows}
                  dataT={classe.students || []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  ) : (
    <Loading />
  )
}

export default ClassDetailsPage
