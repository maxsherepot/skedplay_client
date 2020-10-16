import PropTypes from "prop-types";

export default function StarSvg({ fill }) {
  return (
    <svg
      width="44"
      height="43"
      viewBox="0 0 44 43"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 1L28.489 14.4942L43 16.6714L32.5 27.1693L34.978 42L22 34.9942L9.022 42L11.5 27.1693L1 16.6714L15.511 14.4942L22 1Z"
        stroke="#CCCCCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

StarSvg.propTypes = {
  fill: PropTypes.string
};

StarSvg.defaultProps = {
  fill: "none"
};
