import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Copy = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M3.7 12.7H2.8C2.32261 12.7 1.86477 12.5104 1.52721 12.1728C1.18964 11.8352 1 11.3774 1 10.9V2.8C1 2.32261 1.18964 1.86477 1.52721 1.52721C1.86477 1.18964 2.32261 1 2.8 1H10.9C11.3774 1 11.8352 1.18964 12.1728 1.52721C12.5104 1.86477 12.7 2.32261 12.7 2.8V3.7M9.1 7.3H17.2C18.1941 7.3 19 8.10589 19 9.1V17.2C19 18.1941 18.1941 19 17.2 19H9.1C8.10589 19 7.3 18.1941 7.3 17.2V9.1C7.3 8.10589 8.10589 7.3 9.1 7.3Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default Copy
