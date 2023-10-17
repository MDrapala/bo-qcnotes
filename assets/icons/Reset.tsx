import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Reset = ({
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
        d="M20.55 3.06067V8.44247H15.15M3.45 21V15.6182H8.85M3 11.5819C3.08524 9.61884 3.81487 7.73803 5.07677 6.22842C6.33867 4.7188 8.06303 3.6639 9.98489 3.22581C11.9068 2.78771 13.9198 2.99066 15.7147 3.80348C17.5096 4.61629 18.987 5.99399 19.92 7.72489M21 12.4788C20.897 14.4346 20.1545 16.3031 18.886 17.7989C17.6174 19.2946 15.8925 20.3355 13.9746 20.7625C12.0568 21.1895 10.0514 20.9792 8.26475 20.1637C6.4781 19.3482 5.00836 17.9723 4.08 16.2461"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Reset
