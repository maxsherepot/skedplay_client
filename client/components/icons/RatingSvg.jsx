export default function RatingSvg({
  checked,
  className,
  width = "14",
  height = "13"
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L9.163 4.27865L14 4.96898L10.5 8.29758L11.326 13L7 10.7787L2.674 13L3.5 8.29758L0 4.96898L4.837 4.27865L7 0Z"
        fill={checked ? "#FF3366" : "#F6F6F6"}
      />
    </svg>
  );
}

RatingSvg.defaultProps = {
  checked: true
};
