import { Menu } from "@/types/Default"
import Stat from "@/assets/icons/Stat"
import Organization from "@/assets/icons/Organization"
import Ad from "@/assets/icons/Ad"

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
    name: "QC notes",
    link: "/qcnotes",
    icon: <Ad variant="large" />,
    notification: {
      count: 0
    }
  }
]
