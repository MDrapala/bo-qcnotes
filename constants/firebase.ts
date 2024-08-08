const apiKey = process.env.NEXT_PUBLIC_FBASE_KEY
const projectId = process.env.NEXT_PUBLIC_FBASE_PROJECT_ID
const messagingSenderId = process.env.NEXT_PUBLIC_FBASE_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_FBASE_APP_ID
const measurementId = process.env.NEXT_PUBLIC_FBASE_MEASUREMENT_ID

export const FIREBASE_CONFIG = {
  apiKey: apiKey,
  authDomain: projectId + ".firebaseapp.com",
  databaseURL: "https://" + projectId + ".firebaseio.com",
  projectId,
  storageBucket: projectId + ".appspot.com",
  messagingSenderId,
  appId,
  measurementId
}

export const DB_ETABLISHEMENTS = "etablishements"
export const DB_USERS = "users"
export const DB_CLASSES = "classes"
export const DB_QCNOTES = "qcnotes"
export const DB_QCNOTES_TESTS = "qcnotes-tests"
export const DB_ADMIN = "admins"
