import PropTypes from "prop-types";

const ArrowRight = ({ onClick, width = 22, height = 62, className }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d={`M0.999995 ${height - 1}L${width - 1} ${height / 2}L1 0.999998`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ArrowRight.defaultProps = {
  className: "stroke-divider"
};

ArrowRight.propTypes = {
  className: PropTypes.string
};

export default ArrowRight;
