import Trash from "@/assets/icons/Trash"
import { convertDateToString } from "@/utils/convert"
import { useRouter } from "next/router"
import { Fragment } from "react"

const QCNotesTestRows = ({ item }: { item: any }) => {
  const router = useRouter()
  return (
    <Fragment>
      <tr
        className="border-b-2 border-neutral-50 hover:bg-gray-50 cursor-pointer"
        onClick={() => router.push(`/qcnotes/test/${item?.id}`)}
      >
        <td className="items-center gap-4 py-5 first:pl-7">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item.id}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">
              {convertDateToString(item.dateStart)}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item?.id}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">
              <Trash variant="medium" />
            </p>
          </div>
        </td>
      </tr>
    </Fragment>
  )
}

export default QCNotesTestRows
