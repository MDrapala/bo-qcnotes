import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { FIREBASE_CONFIG } from "@/constants/firebase"

export const app = initializeApp(FIREBASE_CONFIG)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
