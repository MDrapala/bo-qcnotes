import Link from "next/link"
import { Fragment } from "react"
import Chevron from "@/assets/icons/chevrons/ChevronRight"
import Home from "@/assets/icons/Home"

interface BreadCrumps {
  url: string
  name: string
  active: boolean
  target?: boolean
}

const BreadCrumbs = ({ url, target, name, active }: BreadCrumps) => {
  return name === "home" ? (
    <Link href="/dashboard">
      <Home variant="large" />
    </Link>
  ) : (
    <Fragment>
      <Chevron variant="large" size={20} />
      {active ? (
        <Link
          href={url}
          target={target ? "_blank" : undefined}
          className="hover:underline cursor-pointer text-black text-base font-semibold"
        >
          {name}
        </Link>
      ) : (
        <div className="cursor-not-allowed">
          <span className="text-black text-base font-semibold">{name}</span>
        </div>
      )}
    </Fragment>
  )
}

export default BreadCrumbs
