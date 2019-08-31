import PropTypes from "prop-types";

export default function UserSvg({ fill }) {
  return (
    <svg
      width="36"
      height="40"
      viewBox="0 0 36 40"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35 39V34.7778C35 32.5382 34.1045 30.3903 32.5104 28.8067C30.9163 27.223 28.7543 26.3333 26.5 26.3333H9.5C7.24566 26.3333 5.08365 27.223 3.48959 28.8067C1.89553 30.3903 1 32.5382 1 34.7778V39M26.5 9.44444C26.5 14.1082 22.6944 17.8889 18 17.8889C13.3056 17.8889 9.5 14.1082 9.5 9.44444C9.5 4.78071 13.3056 1 18 1C22.6944 1 26.5 4.78071 26.5 9.44444Z"
        stroke="#CCCCCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

UserSvg.propTypes = {
  fill: PropTypes.string
};

UserSvg.defaultProps = {
  fill: "none"
};
