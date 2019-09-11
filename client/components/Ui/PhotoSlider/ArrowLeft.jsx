export default function ArrowLeft({
  onClick,
  width = 8,
  height = 15,
  stroke = "#DFDFDF"
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M7 1L1 7.5L7 14"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
