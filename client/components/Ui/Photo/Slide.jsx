import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function Slide({ className, image, height = 60, width = 40 }) {
  const styles = {
    width,
    height
  };

  return (
    <div className={cx("slide", className)}>
      <img
        className="object-cover rounded-lg"
        src={image}
        alt=""
        style={styles}
      />
    </div>
  );
}

Slide.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};

export default Slide;
