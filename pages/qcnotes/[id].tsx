import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getQCNotesById } from "@/lib/firebase/qcNotes"
import { useForm } from "react-hook-form"
import Loading from "@/components/loading"

const metadata: Metadata = {
  title: "QC Notes"
}

const QCNotesDetails = () => {
  const router = useRouter()
  const id = router.query.id
  const [qcNotes, setQCNotes] = useState<any>()
  const { getValues, setValue, register, reset, watch, handleSubmit } =
    useForm()
  const getQCNotesList = async (id: string) => {
    const qcNotesList = await getQCNotesById(id)
    setQCNotes(qcNotesList)
  }

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    getQCNotesList(id as string).catch((error: TypeError) =>
      console.error(error)
    )
  }, [id])

  useEffect(() => {
    reset(qcNotes)
  }, [qcNotes])

  return qcNotes ? (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/qcnotes" name="QC Notes" active={true} />
          <BreadCrumbs
            url={`/qcnotes/${id}`}
            name={qcNotes?.title}
            active={true}
          />
        </div>
        <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 w-full">
          <h2 className="text-2xl font-medium mb-4">{qcNotes.title}</h2>
          {getValues()?.questions?.map((question: any, key: number) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {question.question}
              </label>
              <div className="flex flex-wrap -mx-2">
                {question?.reponses?.map((response: any, keyRep: number) => (
                  <div key={keyRep} className="px-2 w-1/3">
                    <label
                      htmlFor={`animal-${response.name}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      <input
                        type="checkbox"
                        id={`animal-${response.name}`}
                        value={response.name}
                        className="mr-2"
                        checked={response.isValidate}
                        onChange={(e) => {
                          const newIsValidate = e.target.checked
                          {
                            setValue(`questions.reponses[${keyRep}]`, {
                              name: response.name,
                              isValidate: newIsValidate
                            })
                            reset(getValues())
                          }
                        }}
                      />
                      {response.name}
                    </label>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Loading />
  )
}

export default QCNotesDetails
