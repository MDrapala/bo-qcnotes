import { firestore } from "@/config/firebase"
import { DB_QCNOTES_RESPONSE } from "@/constants/firebase"
import { getDocs, query, where } from "firebase/firestore"
import { collection } from "firebase/firestore"

export const getQCNotesResponse = async () => {
  try {
    let user: any = []
    const q = await getDocs(collection(firestore, DB_QCNOTES_RESPONSE))

    for (const doc of q.docs) {
      user.push({ id: doc.id, ...doc.data() })
    }

    return user
  } catch (error) {
    console.error
  }
}

export const getQCNotesResponseByStudentId = async (id: string) => {
  try {
    let user: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_QCNOTES_RESPONSE),
        where("studentId", "==", id)
      )
    )

    for (const doc of q.docs) {
      user.push({ id: doc.id, ...doc.data() })
    }

    return user
  } catch (error) {
    console.error
  }
}
