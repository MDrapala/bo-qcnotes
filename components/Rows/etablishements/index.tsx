import Trash from "@/assets/icons/Trash"
import Tag from "@/components/Tag"
import { toastNotification } from "@/components/toast"
import { deleteEtablishement } from "@/lib/firebase/etablishements"
import { useRouter } from "next/router"
import { Fragment } from "react"

interface Etablishement {
  id: string
  name: string
  type: string
  classes?: any[]
}

const EtablishementRows = ({
  refresh,
  item
}: {
  refresh: any
  item: Etablishement
}) => {
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

  return (
    <Fragment>
      <tr
        className="border-b-2 border-neutral-50 hover:bg-gray-50 cursor-pointer"
        onClick={() => router.push(`/etablishements/${item.id}`)}
      >
        <td className="items-center gap-4 py-5 first:pl-7">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">
              <Tag text={item?.type} />
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">{item.name}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold text-neutral-base">
              {item?.classes?.length || 0}
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

export default EtablishementRows
