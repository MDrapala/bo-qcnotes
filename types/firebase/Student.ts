export type StudentWithId = Student & { id: string }

export type Student = {
  name: string
  code: string
  etablishement: {
    id: string
    name: string
  }
  classe: {
    id: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}
