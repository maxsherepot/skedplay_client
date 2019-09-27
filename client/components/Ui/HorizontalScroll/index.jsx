import React from "react";
import PropType from "prop-types";
import cx from "classnames";

const HorizontalScroll = ({ children, className, ...restProps }) => (
  <div {...restProps} className="horizontal-scroll">
    <div className={cx("horizontal-scroll__in", className)}>{children}</div>
  </div>
);

HorizontalScroll.propTypes = {
  children: PropType.node,
  className: PropType.string,
  style: PropType.object
};

export default HorizontalScroll;
