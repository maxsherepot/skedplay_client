import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { TextField, FormGroup } from "UI";
import {useTranslation} from "react-i18next";

const CheckCodeStep = ({ phone }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="block text-sm text-center leading-normal my-4 px-6">
        {t('register.verification_code_send')}
      </div>

      {phone && (
        <div className="block text-xl text-center text-dark-green font-medium">{phone}</div>
      )}

      <TextField
        className="mt-4"
        label={t('register.confirmation_code')}
        name="code"
        placeholder={t('register.enter_code')}
      />
    </>
  );
};

CheckCodeStep.propTypes = {
  phone: PropTypes.string
};

CheckCodeStep.validationSchema = Yup.object().shape({
  code: Yup.string().required()
});

export default CheckCodeStep;
