import { Metadata } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getQCNotesById, updateQCNotesById } from "@/lib/firebase/qcNotes"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import BreadCrumbs from "@/components/BreadCrumb"
import Loading from "@/components/loading"
import Layout from "@/pages"
import { Button } from "@/components/Button"

const metadata: Metadata = {
  title: "QCNotes"
}

const QCNotesDetails = () => {
  const router = useRouter()
  const id = router.query.id as string

  const [qcNotes, setQCNotes] = useState<any>({})
  const { getValues, setValue, register, reset, watch, handleSubmit } =
    useForm()

  const metadata: Metadata = {
    title: `${qcNotes?.title}`
  }

  const getQCNotesList = async (id: string) => {
    const qcNotesList = await getQCNotesById(id)
    setQCNotes(qcNotesList)
  }

  const watchFields = watch()
  const points =
    watchFields?.questions &&
    watchFields.questions
      .map((question: any) => question.points)
      .reduce((accumulator: number, current: number) => accumulator + current)

  const onSubmit = async (data: any) => {
    if (points === watchFields?.note) {
      const UpdateQCNotes = await updateQCNotesById(id as string, data)
      if (UpdateQCNotes) {
        toastNotification(`Mise à jour réussie de ${qcNotes.title}`, {
          type: "success"
        })
      }
      getQCNotesList(id as string)
    } else {
      toastNotification(
        `La somme des points ne peut correspond pas à ${watchFields?.note}`,
        { type: "error" }
      )
    }
  }

  useEffect(() => {
    getQCNotesList(id).catch((error: TypeError) => console.error(error))
  }, [id])

  useEffect(() => {
    points > watchFields?.note &&
      toastNotification(
        `La somme des points ne peut pas dépasser ${watchFields?.note}`,
        { type: "error" }
      )
  }, [points])

  useEffect(() => {
    reset(qcNotes)
  }, [qcNotes])

  return qcNotes ? (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/qcnotes" name="QCNotes" active={true} />
          <BreadCrumbs
            url={`/qcnotes/${id}`}
            name={qcNotes?.title}
            active={true}
          />
        </div>
        <div className="flex flex-col bg-white border rounded-lg px-8 py-6 mx-auto my-8 w-full">
          <h2 className="text-2xl font-medium mb-4">
            {qcNotes.title} : Note ({points} / {watchFields?.note})
          </h2>
          {getValues()?.questions?.map((question: any, keyQues: number) => (
            <div key={keyQues} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {question.question} /{" "}
                <input
                  type="number"
                  placeholder="10"
                  min={0}
                  {...register(`questions[${keyQues}].points`, {
                    valueAsNumber: true,
                    required: true,
                    min: 0
                  })}
                  className="w-14 rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />{" "}
                points
              </label>
              <div className="flex flex-wrap -mx-2">
                {question?.answers?.map((response: any, keyRep: number) => (
                  <div key={keyRep} className="px-2 w-1/3">
                    <label
                      htmlFor={`animal-${response}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      <input
                        type="checkbox"
                        id={`animal-${response}`}
                        value={response}
                        className="mr-2"
                        checked={question?.correctAnswers[keyRep]}
                        onChange={(e) => {
                          const newIsValidate = e.target.checked
                          setValue(
                            `questions[${keyQues}].correctAnswers[${keyRep}]`,
                            newIsValidate
                          )
                          reset(getValues())
                        }}
                      />
                      {response}
                    </label>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
          <div className="flex justify-between items-center">
            <Button
              status="EDIT"
              variant="default"
              onClick={handleSubmit(onSubmit)}
              className={`text-white bg-indigo-700 hover:bg-indigo-900`}
            >
              Mettre à jour
            </Button>
            <span className="flex items-center gap-x-2 text-xl">
              Note sur{" "}
              <input
                type="number"
                id="note"
                placeholder="10"
                {...register("note", { valueAsNumber: true, required: true })}
                className="w-14 rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </span>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Loading />
  )
}

export default QCNotesDetails
