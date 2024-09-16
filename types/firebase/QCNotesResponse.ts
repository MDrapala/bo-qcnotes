import { Answer, Questions } from "./QCNotes"

export type QCNoteResponsesWithId = QCNoteResponses & { id: string }

export type QCNoteResponses = {
  eventId: string
  qcNoteId: string
  studentId: string
  responses: Response[]
  globalNote: number
  createdAt: Date
  updatedAt: Date
}

export type Response = {
  answerSelected: Answer
  questionInfo: {
    question: Questions
  }
}
