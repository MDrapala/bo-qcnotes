import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Link = ({ variant, size, height, width, color, ...props }: IconProps) => {
  const variantSize = getVariantSize(variant)
  const heightSize = variantSize ? variantSize : size ? size : height
  const widthSize = variantSize ? variantSize : size ? size : width

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M11.94 7.43803C12.5899 7.74828 13.1557 8.20996 13.5901 8.78427C14.0245 9.35857 14.3148 10.0287 14.4365 10.7385C14.5581 11.4482 14.5077 12.1768 14.2894 12.863C14.0712 13.5492 13.6914 14.173 13.182 14.682L8.68203 19.182C7.83811 20.0259 6.69351 20.5001 5.50003 20.5001C4.30655 20.5001 3.16195 20.0259 2.31803 19.182C1.47411 18.3381 1 17.1935 1 16C1 14.8065 1.47411 13.6619 2.31803 12.818L4.07503 11.061M17.425 10.439L19.182 8.68203C20.0259 7.83811 20.5001 6.69351 20.5001 5.50003C20.5001 4.30655 20.0259 3.16195 19.182 2.31803C18.3381 1.47411 17.1935 1 16 1C14.8065 1 13.6619 1.47411 12.818 2.31803L8.31803 6.81803C7.80866 7.32703 7.42889 7.95084 7.21061 8.63705C6.99233 9.32326 6.94191 10.0518 7.0636 10.7616C7.18528 11.4713 7.47552 12.1415 7.90992 12.7158C8.34432 13.2901 8.9102 13.7518 9.56003 14.062"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Link
