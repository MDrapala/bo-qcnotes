import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Trash = ({
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
      viewBox="0 0 19 20"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M1 4.6H2.8M2.8 4.6H17.2M2.8 4.6L2.8 17.2C2.8 17.6774 2.98964 18.1352 3.32721 18.4728C3.66477 18.8104 4.12261 19 4.6 19H13.6C14.0774 19 14.5352 18.8104 14.8728 18.4728C15.2104 18.1352 15.4 17.6774 15.4 17.2V4.6M5.5 4.6V2.8C5.5 2.32261 5.68964 1.86477 6.02721 1.52721C6.36477 1.18964 6.82261 1 7.3 1H10.9C11.3774 1 11.8352 1.18964 12.1728 1.52721C12.5104 1.86477 12.7 2.32261 12.7 2.8V4.6M7.3 9.1V14.5M10.9 9.1V14.5"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Trash
