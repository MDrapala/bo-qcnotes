import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const EditBorder = ({
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
        d="M19.2 14.394V19.2C19.2 19.6774 19.0104 20.1352 18.6728 20.4728C18.3352 20.8103 17.8774 21 17.4 21H4.8C4.32261 21 3.86477 20.8103 3.52721 20.4728C3.18964 20.1352 3 19.6774 3 19.2V6.59997C3 6.12258 3.18964 5.66475 3.52721 5.32718C3.86477 4.98961 4.32261 4.79997 4.8 4.79997H9.606M17.4001 3L21.0001 6.6L12.0001 15.6H8.40005V12L17.4001 3Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default EditBorder
