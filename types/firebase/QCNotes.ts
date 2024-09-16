export type QCNotesWithId = QCNotes & { id: string }

export type QCNotes = {
  title: string
  globalNote: string
  questions: Questions[]
  createdAt: Date
  updatedAt: Date
}

export type Questions = {
  question: string
  answers: Answer[]
  note: number
}

export type Answer = {
  answer: string
}
