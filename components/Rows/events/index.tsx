import Trash from "@/assets/icons/Trash"
import Tag from "@/components/Tag"
import { toastNotification } from "@/components/toast"
import { deleteEtablishement } from "@/lib/firebase/etablishements"
import { useRouter } from "next/router"
import { Fragment } from "react"

export interface EventsType {
  id: string
  title: string
  groups: {
    classes: string
    qcnotes: string
  }[]
}

const EventsRows = ({ refresh, item }: { refresh: any; item: EventsType }) => {
  const router = useRouter()

  const removeEtablishement = async (id: string) => {
    const remove = await deleteEtablishement(id, { deleted_at: new Date() })
    if (!remove) {
      toastNotification(
        "Une erreur s'est produite lors de la suppréssion de l'établissement",
        {
          type: "error"
        }
      )
    }

    toastNotification(" L'établissement a bien été supprimé !", {
      type: "success"
    })

    refresh()
  }

  const countEventTable = (type: "classes" | "qcnotes") => {
    let list: string[] = []

    for (let i of item.groups) {
      if (list.includes(i[type])) continue
      list.push(i[type])
    }

    return list.length
  }

  return (
    <Fragment>
      <tr
        className="border-b-2 border-neutral-50 hover:bg-gray-50 cursor-pointer"
        onClick={() => router.push(`/events/${item.id}`)}
      >
        <td className="items-center gap-4 py-5 first:pl-7">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">
              <Tag text={item?.title} />
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">
              {countEventTable("classes")}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">
              {item?.groups?.length || 0}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">
              {countEventTable("qcnotes")}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div
            className="flex flex-col"
            onClick={(e) => {
              e.stopPropagation()
              removeEtablishement(item.id)
            }}
          >
            <p className="font-semibold text-neutral-base">
              <Trash variant="medium" />
            </p>
          </div>
        </td>
      </tr>
    </Fragment>
  )
}

export default EventsRows
