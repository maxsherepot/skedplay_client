import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const baseClassName = "btn";

const Button = ({ className, size, level, ...rest }) => (
  <button
    {...rest}
    className={classNames(baseClassName, className, {
      [`btn-${size}`]: size,
      [`btn-${level}`]: level
    })}
  />
);

Button.propTypes = {
  level: PropTypes.oneOf(["outline"]),
  size: PropTypes.oneOf(["sm", "xs"]),
  className: PropTypes.string
};

export default Button;
