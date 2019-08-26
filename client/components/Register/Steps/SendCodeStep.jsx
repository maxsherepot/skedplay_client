import React from "react";
import * as Yup from "yup";
import { Field } from "formik";

import Captcha from "components/Captcha";
import { TextField } from "components/Ui";

function SendCodeStep() {
  return (
    <>
      <TextField
        className="mt-4"
        label="Phone number"
        name="phone"
        placeholder="+417"
      />

      <div className="flex justify-center my-4">
        <Field name="recaptcha" as={Captcha} />
      </div>

      <div className="block text-xs text-center leading-normal mb-8 px-6">
        By clicking the “sing up” button, I agree to the terms of service and
        personal data processing policy
      </div>
    </>
  );
}

SendCodeStep.validationSchema = Yup.object().shape({
  phone: Yup.string().required(),
  recaptcha: Yup.string().required()
});

export default SendCodeStep;
