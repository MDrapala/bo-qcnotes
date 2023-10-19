import { firestore } from "@/config/firebase"
import { DB_CLASSES, DB_USERS } from "@/constants/firebase"
import { doc, getDocs, query, where } from "firebase/firestore"
import {
  DocumentSnapshot,
  getDoc,
  collection,
  orderBy,
  limit
} from "firebase/firestore"

export const getClasseById = async (id: string) => {
  try {
    const classe: DocumentSnapshot = await getDoc(
      doc(firestore, DB_CLASSES, id)
    )
    const studentList = await getStudentsByClass(id)

    return { id: classe.id, students: studentList, ...classe.data() }
  } catch (error) {
    console.error
  }
}

export const getClasseList = async (limits: number) => {
  try {
    let user: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_CLASSES),
        orderBy("created_at", "desc"),
        limit(limits)
      )
    )

    for (const doc of q.docs) {
      const studentList = await getStudentsByClass(doc.id)
      user.push({ id: doc.id, students: studentList, ...doc.data() })
    }

    return user
  } catch (error) {
    console.error
  }
}

const getStudentsByClass = async (id: string) => {
  try {
    const student = await getDocs(
      query(collection(firestore, DB_USERS), where("class_id", "==", id))
    )
    return student.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error
    return null
  }
}

// export const updateUser = async (
//   id: string,
//   data: object
// ): Promise<boolean> => {
//   try {
//     await setDoc(doc(firestore, DB_USERS, id), data, { merge: true })
//     return true
//   } catch (error) {
//     console.error({ error })
//     return false
//   }
// }
