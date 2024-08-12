import Trash from "@/assets/icons/Trash"
import { toastNotification } from "@/components/toast"
import { deleteStudent } from "@/lib/firebase/students"
import { useRouter } from "next/router"
import { Fragment } from "react"
import { ClasseType } from "../classes"
import { EtablishementType } from "../etablishements"

export interface StudentType {
  id: string
  name: string
  code: string
  classe: ClasseType
  etablishement?: EtablishementType
  notes?: any[]
}

const StudentRows = ({
  refresh,
  item
}: {
  refresh: any
  item: StudentType
}) => {
  const router = useRouter()

  const removeStudent = async (id: string) => {
    const remove = await deleteStudent(id, { deleted_at: new Date() })
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
        onClick={() => router.push(`/students/${item?.id}`)}
      >
        <td className="items-center gap-4 py-5 first:pl-7">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item.name}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item.code}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">
              {item.classe.name}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">
              {item.etablishement?.name}
            </p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div className="flex flex-col">
            <p className="font-semibold  text-neutral-base">{item.notes}</p>
          </div>
        </td>
        <td className="items-center gap-4 py-5">
          <div
            className="flex flex-col"
            onClick={(e) => {
              e.stopPropagation()
              removeStudent(item.id)
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

export default StudentRows
