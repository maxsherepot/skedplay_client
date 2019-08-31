import PropTypes from "prop-types";

export default function VideoSvg({ fill }) {
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47 5.28571L32.3636 16L47 26.7143V5.28571Z"
        stroke="#CCCCCC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.1818 1H5.18182C2.87226 1 1 2.91878 1 5.28571V26.7143C1 29.0812 2.87226 31 5.18182 31H28.1818C30.4914 31 32.3636 29.0812 32.3636 26.7143V5.28571C32.3636 2.91878 30.4914 1 28.1818 1Z"
        stroke="#CCCCCC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

VideoSvg.propTypes = {
  fill: PropTypes.string
};

VideoSvg.defaultProps = {
  fill: "none"
};
