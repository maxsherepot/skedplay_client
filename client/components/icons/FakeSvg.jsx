export default function FakeSvg({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.47351 2.45544L6 6L9.46154 9.46154M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
        stroke="#CCCCCC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
