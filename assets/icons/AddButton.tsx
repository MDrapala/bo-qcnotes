const AddButton = ({
  size = 20,
  height,
  width,
  color = "#0F0F0F"
}: {
  size?: number
  height?: number
  width?: number
  color?: string
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : height}
      width={size ? size : width}
      viewBox="0 0 40 41"
      fill="none"
    >
      <rect y="0.5" width="40" height="40" rx="8" fill="#FFF3F0" />
      <path
        d="M20 11.5L20 29.5M11 20.5L29 20.5"
        stroke={color ? color : "#F84110"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default AddButton
