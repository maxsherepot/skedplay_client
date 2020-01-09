import React from "react";
import * as Yup from "yup";
import { Field } from "formik";

import Captcha from "components/Captcha";
import { PhoneField } from "components/Ui";
import {useTranslation} from "react-i18next";

function SendCodeStep() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <PhoneField
        className="my-4"
        label={t('register.phone_number')}
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
