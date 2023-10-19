import { Menu } from "@/types/Default"
import Setting from "@/assets/icons/Setting"
import School from "@/assets/icons/School"
import Stat from "@/assets/icons/Stat"
import Organization from "@/assets/icons/Organization"

export const AdminMenu: Array<Menu> = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <Stat variant="large" />,
    notification: {
      count: 0
    }
  },
  {
    name: "Classes",
    link: "/classes",
    icon: <Organization variant="large" />,
    notification: {
      count: 0
    }
  },
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
