import { Menu } from "@/types/Default"
import Setting from "@/assets/icons/Setting"
import School from "@/assets/icons/School"

export const AdminMenu: Array<Menu> = [
  {
    name: "Signin Students",
    link: "/students",
    icon: <School variant="large" />,
    notification: {
      count: 0
    }
  },
  {
    name: "Settings",
    link: "/settings/members?search=All%20Members",
    icon: <Setting variant="large" />,
    notification: {
      count: 0
    }
  }
]
