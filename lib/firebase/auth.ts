import { FirebaseError } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/config/firebase"

const provider = new GoogleAuthProvider()

interface FirebaseLogin {
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
    if (!userCred._tokenResponse?.isNewUser) {
      return {
        uid: userCred.user.uid,
        email: userCred.user.email,
        message: `Success Hello ${userCred.user.email}`
      }
    } else {
      if (auth.currentUser) {
        await auth.currentUser.delete()
        return { message: "L'utilisateur n'a pas les droits" }
      }
      return { message: "L'utilisateur n'a pas les droits" }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    } else {
      return { message: `Unexpected error, ${error}` }
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
