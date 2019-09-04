import React from "react";
import PropTypes from "prop-types";

function Slide({ image }) {
  const styles = {
    backgroundImage: `url(${image})`,
    width: "50px",
    height: "60px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return <div className="slide" style={styles}></div>;
}

Slide.propTypes = {
  photos: PropTypes.array
};

export default Slide;
