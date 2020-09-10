import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import cx from "classnames";
import { ArrowPrevSvg } from "icons";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import { useSteps } from "hooks";

const ArrowBack = ({ className, href, title, color, back, onPopup }) => {
  const { step, setStep } = useSteps();

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
          onPopup ? "w-3/12" : '',
        "animation-arrow-left text-sm cursor-pointer",
        `text-${color}`,
        className
      )}
      onClick={handleBack}
    >
        <span className="flex items-center">
            <ArrowLeft fontSize="large" className={`stroke-${color === "white" ? color : "red"} ${color === "white" ? "" : "text-red"}`}/>
            <span className="inline-block sm:inline-block sm:ml-1">{title}</span>
        </span>
      {/*<ArrowPrevSvg className={`stroke-${color === "white" ? color : "red"}`}>
        <span className="hidden sm:inline-block ml-2">{title}</span>
      </ArrowPrevSvg>*/}
    </a>
  );
};

ArrowBack.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  back: PropTypes.bool,
  onPopup: PropTypes.bool,
  color: PropTypes.oneOf(["white", "black", "red"])
};

ArrowBack.defaultProps = {
  href: "",
  back: false,
  title: "Back",
  color: "black",
  onPopup: false,
};

export default ArrowBack;
