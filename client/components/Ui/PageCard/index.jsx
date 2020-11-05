import cx from 'classnames';
import PropTypes from "prop-types";

function PageCard({ className, children, fullScreen }) {
  return (
    <div className={cx([
        fullScreen ? "w-full" : "container no-scale",
      className
    ])}>
      <div className="bg-white rounded shadow">{children}</div>
    </div>
  );
}

PageCard.propTypes = {
    fullScreen: PropTypes.bool,
};

PageCard.defaultProps = {
    fullScreen: false,
};

export default PageCard;
