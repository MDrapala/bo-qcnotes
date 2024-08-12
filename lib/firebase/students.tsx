import { firestore } from "@/config/firebase"
import { DB_STUDENTS } from "@/constants/firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"

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
