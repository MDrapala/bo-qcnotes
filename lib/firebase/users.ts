import { firestore } from "@/config/firebase"
import { DB_USERS } from "@/constants/firebase"
import { doc, getDocs, query, where } from "firebase/firestore"
import {
  setDoc,
  DocumentSnapshot,
  getDoc,
  collection,
  orderBy,
  limit
} from "firebase/firestore"

export const getUserByUid = async (uid: string) => {
  try {
    const user: DocumentSnapshot = await getDoc(doc(firestore, DB_USERS, uid))
    return user.data()
  } catch (error) {
    console.error
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user: any = await getDocs(
      query(collection(firestore, DB_USERS), where("email", "==", email))
    )
    return user.docs[0].data()
  } catch (error) {
    console.error
  }
}

export const getUserList = async (limits: number) => {
  try {
    let user: any = []
    const q = await getDocs(
      query(
        collection(firestore, DB_USERS),
        orderBy("created_at", "desc"),
        limit(limits)
      )
    )

    q.forEach((doc: any) => {
      user.push(doc.data())
    })

    return user
  } catch (error) {
    console.error
  }
}

export const updateUser = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_USERS, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
