import PropTypes from "prop-types";

export default function PhotoSvg({ fill }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1V37M28 1V37M1 19H37M1 10H10M1 28H10M28 28H37M28 10H37M4.924 1H33.076C35.2432 1 37 2.75683 37 4.924V33.076C37 35.2432 35.2432 37 33.076 37H4.924C2.75683 37 1 35.2432 1 33.076V4.924C1 2.75683 2.75683 1 4.924 1Z"
        stroke="#CCCCCC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

PhotoSvg.propTypes = {
  fill: PropTypes.string
};

PhotoSvg.defaultProps = {
  fill: "none"
};
