export type EventWithId = Events & { id: string }

export type Events = {
  title: string
  expirationDate: Date
  Groups: Groups[]
  createdAt: Date
  updatedAt: Date
}

export type GroupsWithId = Groups & { id: string }

export type Groups = {
  name: string
  classes: string
  qcnotes: string
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
}
