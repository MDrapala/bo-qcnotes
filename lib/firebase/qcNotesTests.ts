import { firestore } from "@/config/firebase"
import { DB_QCNOTES_TESTS } from "@/constants/firebase"
import { addDoc, doc, getDocs, query, setDoc } from "firebase/firestore"
import {
  DocumentSnapshot,
  getDoc,
  collection,
  orderBy,
  limit
} from "firebase/firestore"

export const getQCNotesTestById = async (id: string) => {
  try {
    const qcNotes: DocumentSnapshot = await getDoc(
      doc(firestore, DB_QCNOTES_TESTS, id)
    )
    return { id: qcNotes.id, ...qcNotes.data() }
  } catch (error) {
    console.error
  }
}

export const getQCNotesTestList = async (limits: number) => {
  try {
    let user: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_QCNOTES_TESTS),
        orderBy("created_at", "desc"),
        limit(limits)
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

export const addQCNotesTest = async (data: object) => {
  try {
    const doc = await addDoc(collection(firestore, DB_QCNOTES_TESTS), data)
    return doc.id
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const updateQCNotesTestById = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_QCNOTES_TESTS, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
