import PropTypes from "prop-types";

export default function ArrowNextSvg({ stroke, children, disabled }) {
  return (
    <div className="animation-arrow-right">
      {children}

      <svg
        className="inline-block"
        width="13"
        height="16"
        viewBox="0 0 13 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8H12M12 8L5.14286 15M12 8L5.14286 1"
          stroke={stroke || disabled ? "#CCCCCC" : "#FF3366"}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

ArrowNextSvg.propTypes = {
  stroke: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

ArrowNextSvg.defaultProps = {
  disabled: false
};
