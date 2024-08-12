import { Menu } from "@/types/Default"
import Stat from "@/assets/icons/Stat"
import School from "@/assets/icons/School"
import Organization from "@/assets/icons/Organization"
import Member from "@/assets/icons/Member"
import Question from "@/assets/icons/Question"
import Calendar from "@/assets/icons/Calendar"

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
    name: "Établissements",
    link: "/etablishements",
    icon: <Organization variant="large" />,
    notification: {
      count: 0
    }
  },
  {
    name: "Classes",
    link: "/classes",
    icon: <School variant="large" />,
    notification: {
      count: 0
    }
  },
  {
    name: "Étudiants",
    link: "/students",
    icon: <Member variant="large" />,
    notification: {
      count: 0
    }
  },
  {
    name: "QC notes",
    link: "/qcnotes",
    icon: <Question variant="large" />,
    notification: {
      count: 0
    }
  },
  {
    name: "Sorties",
    link: "/events",
    icon: <Calendar variant="large" />,
    notification: {
      count: 0
    }
  }
]
