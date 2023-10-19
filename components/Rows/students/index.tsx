import Trash from "@/assets/icons/Trash"
import { useRouter } from "next/router"
import { Fragment } from "react"

const ClasseStudentRows = ({ item }: { item: any }) => {
  const router = useRouter()

  return (
    <Fragment>
      <tr
        className="border-b-2 border-neutral-50 hover:bg-gray-50 cursor-pointer"
        onClick={() => router.push(`/classes/${item?.id}`)}
      >
        <td className="items-center gap-4 py-5 first:pl-7">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item.id}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item.name}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base"></p>
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

export default ClasseStudentRows
