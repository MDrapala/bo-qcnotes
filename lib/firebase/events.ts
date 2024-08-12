import { firestore } from "@/config/firebase"
import { DB_EVENTS } from "@/constants/firebase"
import { getDocs, query, collection, orderBy, limit } from "firebase/firestore"

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
