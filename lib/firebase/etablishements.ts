import { firestore } from "@/config/firebase"
import { DB_CLASSES, DB_ETABLISHEMENTS } from "@/constants/firebase"
import { addDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import {
  DocumentSnapshot,
  getDoc,
  collection,
  orderBy,
  limit
} from "firebase/firestore"

export const getEtablishementById = async (id: string) => {
  try {
    const etablishement: DocumentSnapshot = await getDoc(
      doc(firestore, DB_ETABLISHEMENTS, id)
    )
    if (!etablishement.exists() || etablishement.data().deleted_at) return null

    const classeList = await getClassesByEtablishement(id)

    return {
      id: etablishement.id,
      classes: classeList,
      ...etablishement.data()
    }
  } catch (error) {
    console.error
  }
}

export const getEtablishementList = async (limits: number) => {
  try {
    let etablishements: any = []
    console.log("ok")
    const q = await getDocs(
      query(
        collection(firestore, DB_ETABLISHEMENTS),
        orderBy("created_at", "desc"),
        limit(limits)
      )
    )

    for (const doc of q.docs) {
      if (!doc.data().deleted_at) {
        const classesList = await getClassesByEtablishement(doc.id)
        etablishements.push({ id: doc.id, classes: classesList, ...doc.data() })
      }
    }

    return etablishements
  } catch (error) {
    console.error
  }
}

const getClassesByEtablishement = async (id: string) => {
  try {
    const classes = await getDocs(
      query(
        collection(firestore, DB_CLASSES),
        where("etablishement_id", "==", id)
      )
    )
    return classes.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error
    return null
  }
}

export const addEtablishement = async (data: object) => {
  try {
    await addDoc(collection(firestore, DB_ETABLISHEMENTS), data)
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const updateEtablishement = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_ETABLISHEMENTS, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}

export const deleteEtablishement = async (
  id: string,
  data: object
): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, DB_ETABLISHEMENTS, id), data, { merge: true })
    return true
  } catch (error) {
    console.error({ error })
    return false
  }
}
