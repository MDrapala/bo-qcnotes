import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const CreateDoc = ({
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
        d="M18.4 11.172V8.4L13 3H5.8C5.32261 3 4.86477 3.18964 4.52721 3.52721C4.18964 3.86477 4 4.32261 4 4.8V19.2C4 20.19 4.81 21 5.8 21H11.2M13 3.9V8.4H17.5M16.6 20.1V14.7M13.9 17.4H19.3"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CreateDoc
