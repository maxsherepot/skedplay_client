import React, { Component } from "react";
import PropTypes from "prop-types";
import Recaptcha from "react-recaptcha";
import classNames from "classnames";

// Todo: rewrite to function component with use hooks
class Captcha extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    const { key, setFieldValue, error } = this.props;

    return (
      <div className={classNames("form-group", { error })}>
        {error && <label>{error}</label>}
        <Recaptcha
          sitekey={key}
          render="explicit"
          verifyCallback={response => {
            setFieldValue("recaptcha", response);
          }}
          onloadCallback={() => {}}
        />
      </div>
    );
  }
}

Captcha.defaultProps = {
  key: "6LdhMbIUAAAAAJwdU2c6JCp1w4t9yhtzc6aJt0nT"
};

Captcha.propTypes = {
  key: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired
};

export default Captcha;
