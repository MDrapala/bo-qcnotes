import { IconVariant } from "@/types/Icons"

export const getVariantSize = (variant: IconVariant): string => {
  switch (variant) {
    case "large":
      return "24px"
    case "medium":
      return "16px"
    case "small":
      return "14px"
    default:
      return ""
  }
}
