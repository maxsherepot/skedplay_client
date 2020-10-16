import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function AnimationBackground({full, invert, children, footer}) {
    return (
        <div className="animation-background">
            <div
                className={cx("animation-gradient", {
                    "animation-gradient_full": full
                })}
            >
                {!full && (
                    <img
                        className={cx("animation-background__angle", {
                            "animation-background__angle_invert": invert
                        })}
                        src="/static/img/angle.svg"
                    />
                )}
            </div>

            {children}

            {!full && (<div className="animation-background__footer">
                {footer}
            </div>)}
        </div>
    );
}

AnimationBackground.propTypes = {
    invert: PropTypes.bool,
    full: PropTypes.bool,
};

AnimationBackground.defaultProps = {
    invert: false,
    full: false,
};

export default AnimationBackground;
