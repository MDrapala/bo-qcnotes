import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useForm } from "react-hook-form"
import { toastNotification } from "@/components/toast"
import { useRouter } from "next/router"
import { Button } from "@/components/Button"
import { addQCNotes } from "@/lib/firebase/qcNotes"
import { useEffect, useState } from "react"

const metadata: Metadata = {
  title: "QCNote - Créer un QCNote"
}

const CreateQCNotes = () => {
  const router = useRouter()

  const [isPicture, setIsPicture] = useState(false)
  const {
    getValues,
    setValue,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    defaultValues: {
      title: "",
      note: 10,
      questions: [
        {
          question: "",
          answers: [""],
          answersPicture: [""],
          correctAnswers: [false],
          points: 0
        }
      ],
      created_at: new Date()
    }
  })
  const watchFields = watch()
  const points = watchFields.questions
    .map((question: any) => question.points)
    .reduce((accumulator: number, current: number) => accumulator + current)

  const addQuestion = () => {
    if (points < watchFields?.note) {
      setValue("questions", [
        ...getValues().questions,
        {
          question: "",
          answers: [""],
          correctAnswers: [false],
          points: 0
        }
      ])

      setTimeout(() => {
        const element = document.getElementById("target-section")
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)

      reset(getValues())
    } else {
      toastNotification(
        `La somme des points ne peut pas dépasser ${watchFields?.note}`,
        { type: "error" }
      )
    }
  }

  const removeQuestion = (questionIndex: number) => {
    const updatedQuestions = [...getValues().questions]
    updatedQuestions.splice(questionIndex, 1)
    setValue("questions", updatedQuestions)
    reset(getValues())
  }

  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...getValues().questions]
    updatedQuestions[questionIndex].answers.push("")
    updatedQuestions[questionIndex].correctAnswers.push(false)
    setValue("questions", updatedQuestions)
    reset(getValues())
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...getValues().questions]
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1)
    updatedQuestions[questionIndex].correctAnswers.splice(answerIndex, 1)
    setValue("questions", updatedQuestions)
    reset(getValues())
  }

  const onSubmit = async (data: any) => {
    const QCNotes: any = await addQCNotes(data)
    if (QCNotes) {
      toastNotification(`Création réussie de ${watchFields.title}`, {
        type: "success"
      })
      router.push(`/qcnotes/`)
    }
  }

  useEffect(() => {
    points > watchFields?.note &&
      toastNotification(
        `La somme des points ne peut pas dépasser ${watchFields?.note}`,
        { type: "error" }
      )
  }, [points])

  return (
    <Layout props={metadata}>
      <div className="w-full md:mx-12">
        <div className="md:mt-10 flex items-center gap-4">
          <BreadCrumbs url="/" name="home" active={false} />
          <BreadCrumbs url="/qcnotes" name="QCNotes" active={true} />
          <BreadCrumbs
            url="/qcnotes/create"
            name="Créer un QCNotes"
            active={false}
          />
        </div>
        <div className="flex justify-between w-full mt-10 py-2 mb-10 px-4 sticky top-0 rounded-md bg-gray-100">
          <div className="flex items-center flex-row gap-4 mb-5">
            <div>
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Titre{" "}
                <i className="text-xs">(ce titre sera affiché au étudiants)</i>
                <span className="text-red-500">
                  {errors.title && <span>This field is required</span>}
                </span>
              </label>
              <input
                type="text"
                id="title"
                placeholder="Chateau de versailles"
                {...register("title", { required: true })}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note : {points} / {watchFields?.note}
              </label>
              <input
                type="number"
                id="note"
                placeholder="10"
                min={0}
                {...register("note", { valueAsNumber: true, required: true })}
                className="w-24 rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="mb-5 gap-4 flex items-end">
            <Button
              status="CREATE"
              variant="default"
              onClick={addQuestion}
              className={`bg-indigo-700 hover:bg-indigo-900 ${
                points >= watchFields?.note
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={points >= watchFields?.note}
            >
              Nouvelle question
            </Button>
            <Button
              status="CREATE"
              variant="default"
              onClick={handleSubmit(onSubmit)}
              className="bg-indigo-700 hover:bg-indigo-900"
            >
              Créer
            </Button>
            <Button
              status="SERVER_INDEX"
              variant="default"
              onClick={() => router.push("/qcnotes")}
              className="bg-indigo-400 hover:bg-indigo-600"
            >
              Mes QCNotes
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          {getValues()?.questions?.map(
            (questionData: any, questionIndex: number) => (
              <div
                key={questionIndex}
                className="mb-8"
                id={
                  questionIndex === getValues().questions.length - 1
                    ? "target-section"
                    : ""
                }
              >
                <hr className="my-5" />
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col w-full">
                    <label className="flex mb-2 w-full items-center justify-between">
                      <span className="flex items-center">
                        Question {questionIndex + 1}:
                        <input
                          type="number"
                          className="border w-10 ml-2"
                          min={0}
                          {...register(`questions[${questionIndex}].points`, {
                            valueAsNumber: true,
                            required: true,
                            min: 0,
                            max: watchFields?.note,
                            maxLength: 3
                          })}
                        />
                        points
                      </span>
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      placeholder="Entrez votre question"
                      {...register(`questions[${questionIndex}].question`, {
                        required: true
                      })}
                    />
                  </div>
                  <div className="w-full flex justify-end">
                    {questionIndex !== 0 && (
                      <Button
                        status="DELETE"
                        className="bg-red-500 text-white"
                        onClick={() => removeQuestion(questionIndex)}
                      >
                        Supprimer la question
                      </Button>
                    )}
                  </div>
                </div>
                <div className="ml-10 mt-5">
                  {questionData.answers.map((answer: any, answerIndex: any) => (
                    <div
                      key={answerIndex}
                      className="flex flex-col w-full items-center mt-5"
                    >
                      <div className="flex w-full gap-x-3 items-center">
                        <input
                          type="text"
                          className="w-full border p-2 rounded"
                          placeholder="Entrez votre réponse"
                          {...register(
                            `questions[${questionIndex}].answers[${answerIndex}]`,
                            {
                              required: true
                            }
                          )}
                        />
                        <div className="flex items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            className="w-4 h-4 text-green-600 bg-green-100 border-green-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-green-800 focus:ring-2 dark:bg-green-700 dark:border-green-600"
                            checked={questionData.correctAnswers[answerIndex]}
                            onChange={(e) => {
                              const newIsValidate = e.target.checked
                              setValue(
                                `questions[${questionIndex}].correctAnswers[${answerIndex}]`,
                                newIsValidate
                              )
                              reset(getValues())
                            }}
                          />
                          <label
                            htmlFor="default-checkbox"
                            className="ml-2 text-sm font-medium"
                          >
                            Correcte
                          </label>
                        </div>
                        {answerIndex !== 0 && (
                          <button
                            className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                            onClick={() =>
                              removeAnswer(questionIndex, answerIndex)
                            }
                          >
                            Supprimer
                          </button>
                        )}
                      </div>

                      {answerIndex === questionData.answers.length - 1 && (
                        <div className="w-full flex items-center justify-end mt-5 gap-5">
                          <Button
                            status="CREATE"
                            className="bg-green-500 text-white"
                            onClick={() => addAnswer(questionIndex)}
                          >
                            Nouvelle réponse
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CreateQCNotes
