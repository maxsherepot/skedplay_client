import classNames from "classnames";
import PropTypes from "prop-types";

function LangSelector({ className }) {
  return <div className={classNames(className, "block")}>EN</div>;
}

LangSelector.propTypes = {
  className: PropTypes.string
};

export default LangSelector;
