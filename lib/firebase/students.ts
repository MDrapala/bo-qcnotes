import { firestore } from "@/config/firebase"
import { DB_STUDENTS } from "@/constants/firebase"
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore"

export const getStudentList = async (limits: number) => {
  try {
    let students: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_STUDENTS),
        orderBy("created_at", "desc"),
        limit(limits)
      )
    )

    for (const doc of q.docs) {
      if (!doc.data().deleted_at) {
        students.push({ id: doc.id, notes: 0, ...doc.data() })
      }
    }

    return students
  } catch (error) {
    console.error
  }
}

export const getStudentsByClasseId = async (id: string) => {
  try {
    const classes = await getDocs(
      query(collection(firestore, DB_STUDENTS), where("classe.id", "==", id))
    )
    return classes.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error
    return null
  }
}

export const addStudent = async (data: object) => {
  try {
    await addDoc(collection(firestore, DB_STUDENTS), data)
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
