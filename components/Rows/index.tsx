import React, { Fragment } from "react"

type RowsProps<T> = {
  ColumnNumber: number
  RowComponent: React.FC<{ item: T; setChecked?: any; checked?: any }>
  dataT: any
}

const Rows = <T,>({
  dataT,
  ColumnNumber,
  RowComponent
}: RowsProps<T>): JSX.Element => {
  const rows = dataT

  if (rows.length === 0) {
    return (
      <tr>
        <td colSpan={ColumnNumber}>
          <div className="flex flex-col justify-center items-center">
            <p className="text-neutral-300">No data available</p>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <Fragment>
      {rows.map((item: any, key: any) => (
        <Fragment key={key}>
          <RowComponent item={item} />
        </Fragment>
      ))}
    </Fragment>
  )
}

export default Rows
