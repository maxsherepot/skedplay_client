import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import cx from "classnames";
import { ArrowPrevSvg } from "icons";
import { useSteps } from "hooks";

const ArrowBack = ({ className, href, stepName, title, color, back }) => {
  const { step, setStep } = useSteps(stepName);

  const handleBack = () => {
    if (back) {
      return Router.back();
    }
    if (step === 0) {
      return Router.push(href);
    }

    setStep(Math.max(step - 1, 0));
  };

  return (
    <a
      className={cx(
        "animation-arrow-left text-sm cursor-pointer",
        `text-${color}`,
        className
      )}
      onClick={handleBack}
    >
      <ArrowPrevSvg className={`stroke-${color === "white" ? color : "red"}`}>
        <span className="hidden sm:inline-block ml-2">{title}</span>
      </ArrowPrevSvg>
    </a>
  );
};

ArrowBack.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  stepName: PropTypes.string,
  title: PropTypes.string,
  back: PropTypes.bool,
  color: PropTypes.oneOf(["white", "black"])
};

ArrowBack.defaultProps = {
  href: "",
  stepName: null,
  back: false,
  title: "Back",
  color: "black"
};

export default ArrowBack;
