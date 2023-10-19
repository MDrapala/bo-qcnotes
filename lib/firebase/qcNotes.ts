import { firestore } from "@/config/firebase"
import { DB_QCNOTES } from "@/constants/firebase"
import { addDoc, doc, getDocs, query, setDoc } from "firebase/firestore"
import {
  DocumentSnapshot,
  getDoc,
  collection,
  orderBy,
  limit
} from "firebase/firestore"

export const getQCNotesById = async (id: string) => {
  try {
    const qcNotes: DocumentSnapshot = await getDoc(
      doc(firestore, DB_QCNOTES, id)
    )
    return { id: qcNotes.id, ...qcNotes.data() }
  } catch (error) {
    console.error
  }
}

export const getQCNotesList = async (limits: number) => {
  try {
    let user: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_QCNOTES),
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

export const addQCNotes = async (data: object) => {
  try {
    await addDoc(collection(firestore, DB_QCNOTES), data)
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const updateQCNotes = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_QCNOTES, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
