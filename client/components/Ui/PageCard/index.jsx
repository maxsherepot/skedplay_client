import cx from 'classnames';

function PageCard({ className, children }) {
  return (
    <div className={cx([
      "fluid-container",
      className
    ])}>
      <div className="bg-white rounded shadow">{children}</div>
    </div>
  );
}

export default PageCard;
