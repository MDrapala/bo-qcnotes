import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const User = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M20 21V19C20 17.9392 19.5786 16.9217 18.8284 16.1716C18.0783 15.4215 17.0609 15 16 15H8C6.93913 15 5.92172 15.4215 5.17157 16.1716C4.42143 16.9217 4 17.9392 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79085 11 7.99998 9.20914 7.99998 7C7.99998 4.79086 9.79085 3 12 3C14.2091 3 16 4.79086 16 7Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default User
