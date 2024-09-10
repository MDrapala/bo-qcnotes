import { firestore } from "@/config/firebase"
import { DB_EVENTS } from "@/constants/firebase"
import {
  getDocs,
  query,
  collection,
  orderBy,
  limit,
  addDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  setDoc
} from "firebase/firestore"

type Group = {
  name: string
  classes: string
  qcnotes: string
}
type EventTypes = {
  title: string
  groups: Group[]
}

export const getEventById = async (id: string) => {
  try {
    let resEvent: any = []
    const event: DocumentSnapshot = await getDoc(doc(firestore, DB_EVENTS, id))
    const eventData = event.data() as EventTypes

    // for (const group of eventData.groups) {
    //   const classe = await getClasseById(group.classes)
    //   const qcNotes = await getQCNotesById(group.qcnotes)
    //   resEvent.push({ classes: classe, qcnotes: qcNotes })
    // }

    return { id: event.id, ...eventData }
  } catch (error) {
    console.error
  }
}

export const getEventList = async (limits: number) => {
  try {
    let events: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_EVENTS),
        orderBy("created_at", "desc"),
        limit(limits)
      )
    )

    for (const doc of q.docs) {
      if (!doc.data().deleted_at) {
        // const studentList = await getStudentsByClasseId(doc.id)
        events.push({ id: doc.id, students: 0, classes: 0, ...doc.data() })
      }
    }

    return events
  } catch (error) {
    console.error
  }
}

export const addEvent = async (data: any) => {
  try {
    await addDoc(collection(firestore, DB_EVENTS), data)
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const UpdateEvent = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_EVENTS, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
