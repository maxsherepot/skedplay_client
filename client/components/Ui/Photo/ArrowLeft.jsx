import PropTypes from 'prop-types'

const ArrowLeft = ({ onClick, width = 22, height = 62, className }) => {
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
        d={`M${width - 1} ${height - 1}L1 ${height / 2}L${width - 1} 0.999998`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ArrowLeft.defaultProps = {
  className: "stroke-divider"
};

ArrowLeft.propTypes = {
  className: PropTypes.string
};

export default ArrowLeft;
