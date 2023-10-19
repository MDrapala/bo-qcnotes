import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Toaster } from "react-hot-toast"
import Modal from "react-modal"
import { Provider, useDispatch } from "react-redux"
import { auth } from "@/config/firebase"
import { createSession, revokeSession } from "@/redux/slices/session"
import store from "@/redux/store"

import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { getAdminByUid } from "@/lib/firebase/admins"
import { IS_MOBILE_REGEX } from "@/constants/default"
import Loading from "@/components/loading"
Modal.setAppElement("#__next")

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const [user, loading, _error] = useAuthState(auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return router.push("/auth")
      const right = await getAdminByUid(currentUser.uid)
      if (!right) {
        dispatch(revokeSession())
        router.push("/dashboard")
        return
      }
      dispatch(
        createSession({
          error: "",
          user: {
            displayName: !!currentUser?.displayName && currentUser?.displayName,
            email: currentUser?.email,
            photoURL: currentUser?.photoURL
          }
        })
      )
    })
    return () => unSub()
  }, [])

  useEffect(() => {
    if (!user?.uid && !loading) {
      router.push("/auth")
    }
    if (router.pathname === "/") {
      router.push("/dashboard")
    }
  }, [user?.uid])

  const detectMob = () =>
    [IS_MOBILE_REGEX].some((toMatchItem) =>
      navigator.userAgent.match(toMatchItem)
    )

  return loading ? (
    <Loading />
  ) : (
    <>
      <Toaster />
      <Component key={router.asPath} isMobile={detectMob()} {...pageProps} />
    </>
  )
}

const RootApp = (props: AppProps) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  )
}

export default RootApp
