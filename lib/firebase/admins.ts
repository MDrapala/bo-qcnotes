import { firestore } from "@/config/firebase"
import { DB_ADMIN } from "@/constants/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getAdminByUid = async (uid: string) => {
  const docRef = doc(firestore, DB_ADMIN, uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() }
  } else {
    console.log("No such document!")
    return null
  }
}
