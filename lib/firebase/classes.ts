import { firestore } from "@/config/firebase"
import { DB_CLASSES } from "@/constants/firebase"
import { addDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import {
  DocumentSnapshot,
  getDoc,
  collection,
  orderBy,
  limit
} from "firebase/firestore"
import { getStudentsByClasseId } from "./students"

export const getClasseById = async (id: string) => {
  try {
    const classe: DocumentSnapshot = await getDoc(
      doc(firestore, DB_CLASSES, id)
    )
    const studentList = await getStudentsByClasseId(id)

    return { id: classe.id, students: studentList, ...classe.data() }
  } catch (error) {
    console.error
  }
}

export const getClasseList = async (limits: number) => {
  try {
    let classes: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_CLASSES),
        orderBy("created_at", "desc"),
        limit(limits)
      )
    )

    for (const doc of q.docs) {
      if (!doc.data().deleted_at) {
        const studentList = await getStudentsByClasseId(doc.id)
        classes.push({ id: doc.id, students: studentList, ...doc.data() })
      }
    }

    return classes
  } catch (error) {
    console.error
  }
}

export const getClassesByEtablishementId = async (id: string) => {
  try {
    const classes = await getDocs(
      query(
        collection(firestore, DB_CLASSES),
        where("etablishement.id", "==", id)
      )
    )
    return classes.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error
    return null
  }
}

export const addClasse = async (data: object) => {
  try {
    await addDoc(collection(firestore, DB_CLASSES), data)
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const updateClasse = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_CLASSES, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const deleteClasse = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_CLASSES, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
