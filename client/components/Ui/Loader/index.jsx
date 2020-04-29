import PropTypes from "prop-types";

function Loader({ local }) {
  if (typeof document === 'undefined') {
    return '';
  }

  if (!local) {
    return (
      <div className="loader-wrap">
        <img src="/static/img/loader.svg" alt=""/>
      </div>
    );
  }

  return (
    <img src="/static/img/loader.svg" alt=""/>
  );
}

Loader.propTypes = {
  local: PropTypes.bool
};

export default Loader;
