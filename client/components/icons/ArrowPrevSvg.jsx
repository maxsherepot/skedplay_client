import PropTypes from "prop-types";
import cx from "classnames";

export default function ArrowPrevSvg({ className, children, disabled }) {
  return (
    <div className="animation-arrow-left">
      <svg
        className={cx("inline-block", className, {
          "stroke-light-grey": disabled
        })}
        width="13"
        height="16"
        viewBox="0 0 13 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 8.00024H1M1 8.00024L7.85714 15.0002M1 8.00024L7.85714 1.00024"
          strokeLinejoin="round"
        />
      </svg>

      {children}
    </div>
  );
}

ArrowPrevSvg.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

ArrowPrevSvg.defaultProps = {
  className: "stroke-red",
  disabled: false
};
