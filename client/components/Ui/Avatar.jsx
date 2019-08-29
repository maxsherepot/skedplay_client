import classNames from "classnames";
import PropTypes from "prop-types";

function Avatar({ className, src }) {
  return <img className={classNames(className, "rounded-full")} src={src} />;
}

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string
};

export default Avatar;
