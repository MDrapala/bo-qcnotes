import { FirebaseError } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/config/firebase"

const provider = new GoogleAuthProvider()

interface FirebaseLogin {
  isLogin: boolean
  uid?: string
  email?: string
  message?: string
}

export const Signin = async (): Promise<FirebaseLogin> => {
  try {
    const userCred: any = await signInWithPopup(auth, provider).catch(
      (error: FirebaseError) => {
        return { isLogin: false, message: error.message }
      }
    )

    const email = userCred.user.email
    const uid = userCred.user.uid

    if (email) {
      return {
        isLogin: true,
        uid,
        email,
        message: `Success Hello ${email}`
      }
    }
    return { isLogin: false }
  } catch (error) {
    if (error instanceof Error) {
      return { isLogin: false, message: error.message }
    } else {
      return { isLogin: false, message: `Unexpected error, ${error}` }
    }
  }
}

export const logout = async () => {
  try {
    return await auth.signOut()
  } catch (error) {
    console.error(error)
  }
}
