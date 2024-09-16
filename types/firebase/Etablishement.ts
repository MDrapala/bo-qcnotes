import { Classe } from "./Classe"

export type EtablishementWithId = Etablishement extends infer O
  ? O & { id: string }
  : never

export type Etablishement = {
  name: string
  type: EtablishementType
  classes: Classe[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export enum EtablishementType {
  COLLEGE = "College", // COLLEGE = COLLEGE
  LYCEE = "Lycee" // LYCEE = LYCEE
}
