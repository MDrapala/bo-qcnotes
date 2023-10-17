import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const DotsHorizontal = ({
  variant,
  size,
  height,
  width,
  color,
  ...props
}: IconProps) => {
  const variantSize = getVariantSize(variant)
  const heightSize = variantSize ? variantSize : size ? size : height
  const widthSize = variantSize ? variantSize : size ? size : width

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M11 12C11 12.6213 11.5037 13.125 12.125 13.125C12.7463 13.125 13.25 12.6213 13.25 12C13.25 11.3787 12.7463 10.875 12.125 10.875C11.5037 10.875 11 11.3787 11 12Z"
        fill={color ? color : "#0F0F0F"}
      />
      <path
        d="M18.875 12C18.875 12.6213 19.3787 13.125 20 13.125C20.6213 13.125 21.125 12.6213 21.125 12C21.125 11.3787 20.6213 10.875 20 10.875C19.3787 10.875 18.875 11.3787 18.875 12Z"
        fill={color ? color : "#0F0F0F"}
      />
      <path
        d="M3.125 12C3.125 12.6213 3.62868 13.125 4.25 13.125C4.87132 13.125 5.375 12.6213 5.375 12C5.375 11.3787 4.87132 10.875 4.25 10.875C3.62868 10.875 3.125 11.3787 3.125 12Z"
        fill={color ? color : "#0F0F0F"}
      />
      <path
        d="M11 12C11 12.6213 11.5037 13.125 12.125 13.125C12.7463 13.125 13.25 12.6213 13.25 12C13.25 11.3787 12.7463 10.875 12.125 10.875C11.5037 10.875 11 11.3787 11 12Z"
        stroke={color ? color : "#0F0F0F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.875 12C18.875 12.6213 19.3787 13.125 20 13.125C20.6213 13.125 21.125 12.6213 21.125 12C21.125 11.3787 20.6213 10.875 20 10.875C19.3787 10.875 18.875 11.3787 18.875 12Z"
        stroke={color ? color : "#0F0F0F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.125 12C3.125 12.6213 3.62868 13.125 4.25 13.125C4.87132 13.125 5.375 12.6213 5.375 12C5.375 11.3787 4.87132 10.875 4.25 10.875C3.62868 10.875 3.125 11.3787 3.125 12Z"
        stroke={color ? color : "#0F0F0F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DotsHorizontal
