import PropTypes from "prop-types";
import cx from "classnames";

function Loader({ local }) {
  if (!local) {
    return (
      <div className="loader-wrap">
        <img src="/static/img/loader.svg" alt=""/>
        {/*<div className="lds-ring">*/}
        {/*  <div></div>*/}
        {/*  <div></div>*/}
        {/*  <div></div>*/}
        {/*  <div></div>*/}
        {/*</div>*/}
      </div>
    );
  }

  return (
    <img src="/static/img/loader.svg" alt=""/>
    // <div className="lds-ellipsis">
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
}

Loader.propTypes = {
  local: PropTypes.bool
};

export default Loader;
