export type ClasseWithId = Classe & { id: string }

export type Classe = {
  name: string
  etablishement: {
    id: string
    name: string
  }
  students: []
  createdAt: Date
  updatedAt: Date
}
