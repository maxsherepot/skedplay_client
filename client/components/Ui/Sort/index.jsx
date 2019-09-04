import PropTypes from "prop-types";

function Sort({ children }) {
  return (
    <div className="container flex justify-between my-6">
      {children}
      <span>First: the neareast</span>
    </div>
  );
}

Sort.propTypes = {
  children: PropTypes.node
};

export default Sort;
