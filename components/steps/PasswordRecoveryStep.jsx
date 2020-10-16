import React from "react";
import * as Yup from "yup";

import { TextField } from "UI";
import {useTranslation} from "react-i18next";

const PasswordRecoveryStep = () => {
  const {t, i18n} = useTranslation();

  return (
    <>
      <TextField
        label={t('account.password.new')}
        type="password"
        name="password"
        placeholder={t('account.password.enter_new_password')}
      />

      <TextField
        label={t('account.password.confirm_new')}
        type="password"
        name="password_confirmation"
        placeholder={t('account.password.enter_new_password_confirmation')}
      />
    </>
  );
};

PasswordRecoveryStep.validationSchema = Yup.object().shape({
  password: Yup.string().required(),
  password_confirmation: Yup.string().required()
});

export default PasswordRecoveryStep;
