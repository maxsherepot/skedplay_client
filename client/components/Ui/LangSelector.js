import classNames from "classnames";
import {Lang} from "UI";
import PropTypes from "prop-types";

function LangSelector({ className }) {
  return (
    <Lang black={true} className={className} />
  );
}

LangSelector.propTypes = {
  className: PropTypes.string
};

export default LangSelector;
