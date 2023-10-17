import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Ad = ({ variant, size, height, width, color, ...props }: IconProps) => {
  const variantSize = getVariantSize(variant)
  const heightSize = variantSize ? variantSize : size ? size : height
  const widthSize = variantSize ? variantSize : size ? size : width

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 25"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M12.2727 6.51807V18.5181M15 8.69988H10.9091C10.4028 8.69988 9.91718 8.90102 9.55916 9.25904C9.20114 9.61707 9 10.1027 9 10.609C9 11.1153 9.20114 11.6009 9.55916 11.9589C9.91718 12.3169 10.4028 12.5181 10.9091 12.5181H13.6364C14.1427 12.5181 14.6283 12.7192 14.9863 13.0772C15.3443 13.4352 15.5455 13.9208 15.5455 14.4272C15.5455 14.9335 15.3443 15.4191 14.9863 15.7771C14.6283 16.1351 14.1427 16.3362 13.6364 16.3362H9M21 12.5181C21 17.4886 16.9706 21.5181 12 21.5181C7.02944 21.5181 3 17.4886 3 12.5181C3 7.5475 7.02944 3.51807 12 3.51807C16.9706 3.51807 21 7.5475 21 12.5181Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Ad
