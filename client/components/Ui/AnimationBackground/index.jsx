import PropTypes from "prop-types";
import classNames from "classnames";

function AnimationBackground({ full }) {
  return (
    <div className="animation-background">
      <div
        className={classNames("animation-gradient", {
          "animation-gradient_full": full
        })}
      >
        {!full && (
          <img
            className="animation-background__angle"
            src="/static/img/angle.svg"
          />
        )}
      </div>
      {!full && <div className="animation-background__footer" />}
    </div>
  );
}

AnimationBackground.propTypes = {
  full: PropTypes.bool
};

AnimationBackground.defaultProps = {
  full: false
};

export default AnimationBackground;
