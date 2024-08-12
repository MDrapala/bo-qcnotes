import Trash from "@/assets/icons/Trash"
import { toastNotification } from "@/components/toast"
import { deleteClasse } from "@/lib/firebase/classes"
import { useRouter } from "next/router"
import { Fragment } from "react"

interface Classe {
  id: string
  name: string
  etablishement?: {
    id?: string
    name?: string
  }
  students?: any[]
}

const ClassesRows = ({ refresh, item }: { refresh: any; item: Classe }) => {
  const router = useRouter()

  const removeClasse = async (id: string) => {
    const remove = await deleteClasse(id, { deleted_at: new Date() })
    if (!remove) {
      toastNotification(
        "Une erreur s'est produite lors de la suppréssion de la classe",
        {
          type: "error"
        }
      )
    }

    toastNotification(" La classe a bien été supprimé !", {
      type: "success"
    })

    refresh()
  }

  return (
    <Fragment>
      <tr
        className="border-b-2 border-neutral-50 hover:bg-gray-50 cursor-pointer"
        onClick={() => router.push(`/classes/${item?.id}`)}
      >
        <td className="items-center gap-4 py-5 first:pl-7">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item?.name}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">
              {item?.etablishement?.name}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">
              {item?.students?.length || 0}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div
            className="flex flex-col"
            onClick={(e) => {
              e.stopPropagation()
              removeClasse(item.id)
            }}
          >
            <p className="font-semibold  text-neutral-base">
              <Trash variant="medium" />
            </p>
          </div>
        </td>
      </tr>
    </Fragment>
  )
}

export default ClassesRows
