import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const baseClassName = "btn";

const Button = ({ className, weight, size, level, outline, ...rest }) => (
  <button
    {...rest}
    className={classNames(
      baseClassName,
      {
        [`font-${weight}`]: weight,
        [`btn-${size}`]: size,
        [`btn-${level}`]: level,
        ["btn-outline"]: outline
      },
      className
    )}
  />
);

Button.propTypes = {
  level: PropTypes.oneOf(["normal", "bold", "black"]),
  level: PropTypes.oneOf(["primary", "secondary", "black", "success"]),
  outline: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "xs", "xxs"]),
  className: PropTypes.string
};

Button.defaultProps = {
  weight: "bold",
  level: "primary",
  outline: false
};

export default Button;
