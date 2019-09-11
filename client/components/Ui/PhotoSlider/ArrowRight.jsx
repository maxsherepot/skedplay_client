export default function ArrowRight({
  onClick,
  width = 8,
  height = 15,
  stroke = "#FF3366"
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
        d="M0.999999 1L7 7.5L1 14"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
