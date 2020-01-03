import React from "react";
import * as Yup from "yup";
import { Field } from "formik";

import Captcha from "components/Captcha";
import { PhoneField } from "components/Ui";

function SendCodeStep() {
  return (
    <>
      <PhoneField
        className="my-4"
        label="Phone number"
        name="phone"
        placeholder="+417"
      />

      {/* <div className="flex justify-center">
        <Field name="recaptcha" as={Captcha} />
      </div> */}
    </>
  );
}

SendCodeStep.validationSchema = Yup.object().shape({
  phone: Yup.string().required(),
  // recaptcha: Yup.string().required()
});

export default SendCodeStep;
