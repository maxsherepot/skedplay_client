import classNames from "classnames";
import {Lang} from "UI";
import PropTypes from "prop-types";

function LangSelector({ className, black = true }) {
  return (
    <Lang black={black} className={className} />
  );
}

LangSelector.propTypes = {
  className: PropTypes.string
};

export default LangSelector;
