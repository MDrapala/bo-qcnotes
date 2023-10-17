import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Enter = ({
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
        d="M10.3529 8.29412L4 14.6471L10.3529 21M20.9412 3V10.4118C20.9412 11.535 20.495 12.6123 19.7007 13.4066C18.9064 14.2008 17.8292 14.6471 16.7059 14.6471H5.05882"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Enter
