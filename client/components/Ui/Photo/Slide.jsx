import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function Slide({ className, image, height = 60, width = 40 }) {
  const styles = {
    backgroundImage: `url(${image})`,
    width,
    height,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return <div className={cx("slide", className)} style={styles}></div>;
}

Slide.propTypes = {
  photos: PropTypes.array
};

export default Slide;
