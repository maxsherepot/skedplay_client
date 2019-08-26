import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const baseClassName = "btn";

const Button = ({ className, size, level, outline, ...rest }) => (
  <button
    {...rest}
    className={classNames(baseClassName, className, {
      [`btn-${size}`]: size,
      [`btn-${level}`]: level,
      ["btn-outline"]: outline
    })}
  />
);

Button.propTypes = {
  level: PropTypes.oneOf(["primary", "secondary", "outline"]),
  outline: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "xs"]),
  className: PropTypes.string
};

Button.defaultProps = {
  level: "primary",
  outline: false
};

export default Button;
