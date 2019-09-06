export default function CloseSvg({
  width = 14,
  height = 14,
  className = "stroke-red",
  ...rest
}) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      className={className}
      {...rest}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L1 13M1 1L13 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
