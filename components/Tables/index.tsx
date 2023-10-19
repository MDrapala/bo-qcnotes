import { cx } from "class-variance-authority"
import Rows from "@/components/Rows"
import type { HeaderTable, RowProps } from "@/types/Table"

type Props<T> = {
  header: HeaderTable[]
  rows: React.FC<RowProps<T>> | any
  dataT?: any
}

const Table = <T,>({ header, rows, dataT }: Props<T>) => {
  return (
    <div className="flex flex-col">
      <table className="table-auto rounded-t-lg bg-neutral-50">
        <thead>
          <tr>
            {header.map((item: HeaderTable, index: number) => (
              <th
                key={index}
                className={cx(
                  "text-neutral-300 text-left py-[15px] font-normal leading-3 text-xs first:pl-8 sticky top-0 first:rounded-tl-lg last:rounded-tr-lg bg-neutral-50",
                  item.columnClass
                )}
              >
                <span>{item.title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          <Rows
            dataT={dataT}
            ColumnNumber={header.length}
            RowComponent={rows}
          />
        </tbody>
      </table>
      {/* {!dataT && (
        // <Pagination
        //   classNames={{
        //     list: "flex justify-center mt-5 mb-5",
        //     selectedItem: "text-neutral-base add-bottom-border",
        //     disabledItem:
        //       "px-2 py-1 mx-1 text-sm font-medium text-neutral-300 rounded-md cursor-pointer",
        //     item: "px-2 py-1 mx-1 text-sm font-medium text-neutral-300 rounded-md cursor-pointer"
        //   }}
        //   padding={4}
        //   showFirst={true}
        //   showPrevious={true}
        //   showNext={true}
        //   showLast={true}
        // />
        <Pagination />
      )} */}
    </div>
  )
}

export default Table
