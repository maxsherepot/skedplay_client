import PropTypes from "prop-types";
import cx from "classnames";

const ArrowLeft = ({ onClick, width = 22, height = 62, className }) => {
  return (
    <div className="flex items-center w-4 h-full">
      <svg
        className={cx("arrow-prev", className)}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path
          d={`M${width - 1} ${height - 1}L1 ${height / 2}L${width -
            1} 0.999998`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

ArrowLeft.defaultProps = {
  className: "stroke-divider"
};

ArrowLeft.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

export default ArrowLeft;
