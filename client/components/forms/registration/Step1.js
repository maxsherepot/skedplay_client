import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

import { TextField } from "components/forms";
import Captcha from "components/Captcha";

function Step1({ setFieldValue, touched, errors }) {
  return (
    <Fragment>
      <TextField
        className="mt-4"
        label="Phone number"
        name="phone"
        error={touched.username && errors.username ? errors.username : null}
      />

      <div className="flex justify-center my-4">
        <Field
          name="recaptcha"
          setFieldValue={setFieldValue}
          error={touched.password && errors.password ? errors.password : null}
          component={Captcha}
        />
      </div>

      <div className="block text-xs text-center leading-normal mb-8 px-6">
        By clicking the “sing up” button, I agree to the terms of service and
        personal data processing policy
      </div>
    </Fragment>
  );
}

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default Step1;
