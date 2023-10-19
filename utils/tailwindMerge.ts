import { twMerge } from "tailwind-merge"
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join"

export const cn = (...inputs: ClassNameValue[]) => {
  return twMerge(inputs)
}
