import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { AdminMenu } from "./menu/admin"
import { Menu } from "@/types/Default"
import Off from "@/assets/icons/Off"
import { logout } from "@/lib/firebase/auth"
import { auth } from "@/config/firebase"

// type RightResponse = {
//   id: string
//   status: "Admin" | "Iconograph" | ""
// }
const Header = () => {
  const router = useRouter()
  const url = router.pathname.substring(1)
  const handleLogout = () => logout()

  const user = auth.currentUser
  const replacePicture =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"

  const [listMenu, setMenuList] = useState<Menu[]>(AdminMenu)
  // const getRigthByUserId = async (userId: string) => {
  //   const right = (await getRightUserByUid(userId)) as RightResponse
  //   switch (right.status) {
  //     case "Admin":
  //       setMenuList(AdminMenu)
  //       break
  //     case "Iconograph":
  //       setMenuList(IconographMenu)
  //       break
  //   }
  // }

  // useEffect(() => {
  //   getRigthByUserId(user?.uid as string).catch((err) => console.error(err))
  // }, [user])

  return (
    <div className="h-screen sticky top-0 bg-gray-200">
      <aside className="flex flex-col items-center bg-white text-gray-700 shadow h-full">
        <div className="h-24 mt-5 flex flex-col items-center w-full">
          <img
            className="h-10 w-10 mx-auto rounded-full"
            src={user?.photoURL || replacePicture}
            alt="picture logo"
          />
        </div>
        <ul>
          {listMenu.map((menu) => {
            const newUrl = url.split("/")[0] // movies/[id] return movies
            return (
              <li className="hover:bg-gray-100" key={menu.name}>
                <Link
                  href={menu.link}
                  className="relative h-12 px-6 flex justify-center items-center w-full
                  focus:text-orange-500"
                >
                  <div className="flex h-full justify-center items-center cursor-pointer">
                    {React.cloneElement(menu.icon, {
                      color: newUrl == menu.name.toLowerCase() && "#ff3600"
                    })}
                  </div>
                  {newUrl == menu.name.toLowerCase() && (
                    <div className="bg-primary-base h-full rounded-l-lg p-[2px] absolute top-0 right-0" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto h-16 flex items-center w-full">
          <button
            className="h-16 cursor-pointer mx-auto flex justify-center items-center
          w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"
            onClick={() => handleLogout()}
          >
            <Off variant="large" color="#ff3600" />
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Header
