import { Metadata } from "next"
import Layout from ".."
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getUserList, updateUser } from "@/lib/firebase/users"
import { toastNotification } from "@/components/toast"
import BreadCrumbs from "@/components/BreadCrumb"

const metadata: Metadata = {
  title: "Students"
}

const StudentsPage = () => {
  const [studentList, setStudentList] = useState<any>([])
  const [userCode, setUserCode] = useState<string>("")
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: any) => {
    const addStudent = await updateUser(userCode, {
      ...data,
      code: userCode,
      created_at: new Date()
    })
    if (addStudent) {
      toastNotification("L'étudiant a été ajouté avec succèes", {
        type: "success"
      })
      handleGenere()
      reset()
      loadStudent()
    }
  }

  const handleGenere = () => {
    const code = Math.random().toString(36).substring(7).toString()
    setUserCode(code)
  }

  const loadStudent = async () => {
    const userList = await getUserList(20)
    setStudentList(userList)
  }

  useEffect(() => {
    loadStudent().catch((err) => console.error(err))
    handleGenere()
  }, [])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/dashboard" name="home" active={false} />
          <BreadCrumbs url="/students" name="Students" active={false} />
        </div>
        <div className="flex my-12 w-full">
          <div className="w-1/2">
            <div className="w-96 border rounded p-5">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Prénom{" "}
                  <span className="text-red-500">
                    {errors.name && <span>This field is required</span>}
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Classes{" "}
                  <span className="text-red-500">
                    {errors.classes && <span>This field is required</span>}
                  </span>
                </label>
                <input
                  type="text"
                  id="classes"
                  placeholder="Classes"
                  {...register("classes", { required: true })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="userCode"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Générateur de code étudiant
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
                    Genrer
                  </button>
                </div>

                {errors.name && <span>This field is required</span>}
              </div>
              <button
                className="bg-green-500 hover:bg-green-600 rounded text-white px-3 w-full py-2"
                onClick={handleSubmit(onSubmit)}
              >
                {" "}
                Ajouter un(e) étudiant(e){" "}
              </button>
            </div>
          </div>
          <div className="flex flex-col w-2/3 mb-32">
            <h5 className="text-xl mb-5">Listes des étudiants</h5>
            <table className="border border-gray-200 rounded overflow-hidden shadow-md">
              <thead className="bg-gray-500 text-white text-left">
                <tr>
                  <th>Name</th>
                  <th>Classes</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {studentList?.map((student: any) => (
                  <tr key={student.code} className="hover:bg-gray-50">
                    <td>{student.name}</td>
                    <td>{student.classes}</td>
                    <td>{student.code}</td>
                  </tr>
                ))}{" "}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StudentsPage
