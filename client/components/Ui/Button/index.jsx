import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const baseClassName = "btn";

const Button = forwardRef(({ className, weight, size, level, outline, ...rest }, ref) => (
  <button
    ref={ref}
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
));

Button.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "black"]),
  level: PropTypes.oneOf([
    "primary",
    "primary-black",
    "secondary",
    "black",
    "grey",
    "success"
  ]),
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
