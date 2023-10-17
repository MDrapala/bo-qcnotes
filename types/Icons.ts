import { HTMLAttributes } from "react"

export type IconVariant = "default" | "large" | "medium" | "small"

export type IconProps = HTMLAttributes<SVGElement> & {
  variant: IconVariant
  size?: number
  height?: number
  width?: number
  color?: string
}
