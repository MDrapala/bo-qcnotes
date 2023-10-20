// pages/qcm.tsx

import React, { useState } from "react"

const QcmPage: React.FC = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: [""],
      correctAnswers: [false]
    }
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: [""], correctAnswers: [false] }
    ])
  }

  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers.push("")
    updatedQuestions[questionIndex].correctAnswers.push(false)
    setQuestions(updatedQuestions)
  }

  const handleQuestionChange = (questionIndex: number, text: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].question = text
    setQuestions(updatedQuestions)
  }

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers[answerIndex] = text
    setQuestions(updatedQuestions)
  }

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].correctAnswers[answerIndex] = isCorrect
    setQuestions(updatedQuestions)
  }

  const removeQuestion = (questionIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(questionIndex, 1)
    setQuestions(updatedQuestions)
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1)
    updatedQuestions[questionIndex].correctAnswers.splice(answerIndex, 1)
    setQuestions(updatedQuestions)
  }

  const handleSubmit = () => {
    // Vous pouvez envoyer les données du QCM où vous le souhaitez, par exemple, à une API.
    console.log(questions)
  }

  return (
    <div className="w-full">
      {questions.map((questionData, questionIndex) => (
        <div key={questionIndex} className="mb-8">
          <label className="flex mb-2 w-full items-center justify-between">
            Question {questionIndex + 1}:
            <button
              className="bg-red-500 text-white px-1 py-1 rounded mb-4"
              onClick={() => removeQuestion(questionIndex)}
            >
              Supprimer la question
            </button>
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={questionData.question}
            placeholder="Entrez votre question"
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />
          <div className="ml-10 mt-5">
            {questionData.answers.map((answer, answerIndex) => (
              <div
                key={answerIndex}
                className="flex flex-col w-full items-center mt-5"
              >
                <div className="flex w-full gap-x-3 items-center">
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Entrez votre réponse"
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(
                        questionIndex,
                        answerIndex,
                        e.target.value
                      )
                    }
                  />
                  <div className="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-green-600 bg-green-100 border-green-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-green-800 focus:ring-2 dark:bg-green-700 dark:border-green-600"
                      checked={questionData.correctAnswers[answerIndex]}
                      onChange={(e) =>
                        handleCorrectAnswerChange(
                          questionIndex,
                          answerIndex,
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium"
                    >
                      Correcte
                    </label>
                  </div>
                  <button
                    className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => removeAnswer(questionIndex, answerIndex)}
                  >
                    Supprimer
                  </button>
                </div>
                {answerIndex - 1 && (
                  <div className="w-full flex items-center justify-end mt-5 gap-5">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => addAnswer(questionIndex)}
                    >
                      Ajouter
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end items-center gap-x-4">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={addQuestion}
        >
          Ajouter une question
        </button>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded "
          onClick={handleSubmit}
        >
          Créer le QCM
        </button>
      </div>
    </div>
  )
}

export default QcmPage
