import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import Recaptcha from "react-recaptcha";
import classNames from "classnames";

// Todo: rewrite to function component with use hooks
function Captcha({ key, name }) {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

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

Captcha.defaultProps = {
  key: "6LdhMbIUAAAAAJwdU2c6JCp1w4t9yhtzc6aJt0nT"
};

Captcha.propTypes = {
  name: PropTypes.string.isRequired,
  key: PropTypes.string
};

export default Captcha;
