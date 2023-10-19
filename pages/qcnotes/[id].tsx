import { Metadata } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getQCNotesById, updateQCNotesById } from "@/lib/firebase/qcNotes"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import BreadCrumbs from "@/components/BreadCrumb"
import Loading from "@/components/loading"
import Layout from "@/pages"

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
    const UpdateQCNotes = await updateQCNotesById(id as string, data)
    if (UpdateQCNotes) {
      toastNotification(`Mise à jour réussie de ${qcNotes.title}`, {
        type: "success"
      })
    }
    getQCNotesList(id as string)
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
          {getValues()?.questions?.map((question: any, keyQues: number) => (
            <div key={keyQues} className="mb-4">
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
                          setValue(
                            `questions[${keyQues}].reponses[${keyRep}].isValidate`,
                            newIsValidate
                          )
                          reset(getValues())
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
          <div className="flex justify-between items-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Mettre à jour
            </button>
            <span className="text-xl">Note sur {qcNotes.note}</span>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Loading />
  )
}

export default QCNotesDetails