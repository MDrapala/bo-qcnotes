import React, { Fragment } from "react"

type RowsProps<T> = {
  refresh: () => void
  ColumnNumber: number
  RowComponent: React.FC<{
    refresh: () => void
    item: T
    setChecked?: any
    checked?: any
  }>
  dataT: any
}

const Rows = <T,>({
  refresh,
  dataT,
  ColumnNumber,
  RowComponent
}: RowsProps<T>): JSX.Element => {
  const rows = dataT

  if (rows.length === 0) {
    return (
      <tr>
        <td colSpan={ColumnNumber}>
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="text-neutral-300">Aucune donnée disponible.</p>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <Fragment>
      {rows.map((item: any, key: any) => (
        <Fragment key={key}>
          <RowComponent refresh={refresh} item={item} />
        </Fragment>
      ))}
    </Fragment>
  )
}

export default Rows
