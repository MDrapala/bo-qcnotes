import { Metadata } from "next"
import Layout from ".."
import BreadCrumbs from "@/components/BreadCrumb"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { addQCNotes } from "../../lib/firebase/qcNotes"
import { toastNotification } from "@/components/toast"
import { useRouter } from "next/router"

const metadata: Metadata = {
  title: "QCNotes"
}

const CreateQCNotes = () => {
  const router = useRouter()

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
          correctAnswers: [false],
          points: 0
        }
      ],
      created_at: new Date()
    }
  })

  const addQuestion = () => {
    setValue("questions", [
      ...getValues().questions,
      {
        question: "",
        answers: [""],
        correctAnswers: [false],
        points: 0
      }
    ])
    reset(getValues())
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
      toastNotification(`Création réussie de ${getValues().title}`, {
        type: "success"
      })
      reset()
      router.push(`/qcnotes/${QCNotes.id}`)
    }
  }

  useEffect(() => {
    reset()
  }, [])

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
        <div className="flex justify-between w-full items-center mt-12">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nom du QCNotes (ce titre sera affiché au étudiants)
              <span className="text-red-500">
                {errors.title && <span>This field is required</span>}
              </span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Sortie au chateau de versailles"
              {...register("title", { required: true })}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="note"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Le QCNotes sera sur ?
              <span className="text-red-500">
                {errors.note && <span>This field is required</span>}
              </span>
            </label>
            <input
              type="number"
              id="note"
              placeholder="10"
              {...register("note", { valueAsNumber: true, required: true })}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        {/* exp  */}
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-2xl mt-12">
              Mes Questions | Nombre de points à attribuer: {getValues().note}
            </h1>
            <div className="">
              {getValues()?.questions?.map(
                (questionData: any, questionIndex: number) => (
                  <div key={questionIndex} className="mb-8">
                    <label className="flex mb-2 w-full items-center justify-between">
                      <span className="flex items-center">
                        Question {questionIndex + 1}:
                        <input
                          type="number"
                          className="border w-10 ml-2"
                          {...register(`questions[${questionIndex}].points`, {
                            valueAsNumber: true,
                            required: true
                          })}
                        />
                        points
                      </span>
                      {questionIndex !== 0 && (
                        <button
                          className="bg-red-500 text-white px-1 py-1 rounded mb-4"
                          onClick={() => removeQuestion(questionIndex)}
                        >
                          Supprimer la question
                        </button>
                      )}
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      placeholder="Entrez votre question"
                      {...register(`questions[${questionIndex}].question`, {
                        required: true
                      })}
                    />
                    <div className="ml-10 mt-5">
                      {questionData.answers.map(
                        (answer: any, answerIndex: any) => (
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
                                  checked={
                                    questionData.correctAnswers[answerIndex]
                                  }
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

                            {answerIndex ===
                              questionData.answers.length - 1 && (
                              <div className="w-full flex items-center justify-end mt-5 gap-5">
                                <button
                                  className="bg-green-500 text-white px-2 py-1 rounded"
                                  onClick={() => addAnswer(questionIndex)}
                                >
                                  Nouvelle réponse
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-x-4">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={addQuestion}
          >
            Ajouter une question
          </button>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded "
            onClick={handleSubmit(onSubmit)}
          >
            Créer le QCM
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default CreateQCNotes
