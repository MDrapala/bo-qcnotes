import { toastNotification } from "@/components/toast"
import { Signin } from "@/lib/firebase/auth"
import { useRouter } from "next/router"

const HomePage = () => {
  const router = useRouter()

  const signInWithGoogle = async () => {
    const login = await Signin()
    if (!login?.uid) {
      toastNotification(login.message as string, {
        type: "error"
      })
    } else {
      toastNotification(login.message as string, {
        type: "success"
      })
      router.push("/dashboard")
    }
  }

  return (
    <div className="h-screen py-16 bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="text-center">
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  QCNotes
                </h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <button
                  onClick={signInWithGoogle}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
