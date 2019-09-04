import PropTypes from "prop-types";
import cx from "classnames";

function Badge({ className, children }) {
  return (
    <div
      className={cx(
        "badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none inline-block text-white",
        className
      )}
    >
      {children}
    </div>
  );
}

Badge.propTypes = {
  children: PropTypes.node
};

export default Badge;
