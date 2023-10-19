export interface Table<T> {
  header: HeaderTable[]
  rows: RowProps<T>[]
}

export interface HeaderTable {
  title: string
  columnClass?: string
  search?: string
}

export type RowProps<T> = {
  item: T | never
  checked?: any
  setChecked?: any
}
