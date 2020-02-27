import React from "react";
import * as Yup from "yup";

import { TextField, ButtonGroupField, DateRawField } from "UI";
import {useTranslation} from "react-i18next";

const RegisterStep = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <ButtonGroupField
        style={{
          marginBottom: '50px',
        }}
        className="mt-4"
        label={t('register.account_type')}
        name="account_type"
        items={[
          {
            name: t('register.employee'),
            value: "employee"
          },
          {
            name: t('register.club_owner'),
            value: "club_owner"
          },
          {
            name: t('register.client'),
            value: "client"
          }
        ]}
      />

      <div className="md:flex md:justify-between md:-mx-3">
        <ButtonGroupField
          className="md:w-5/12 md:px-3"
          label={t('common.gender')}
          name="gender"
          items={[
            {
              name: t('common.male'),
              value: 2
            },
            {
              name: t('common.female'),
              value: 1
            }
          ]}
        />

        <DateRawField
          className="md:w-7/12 md:px-3"
          label={t('register.birth')}
          name="birthday"
        />
      </div>

      <div className="sm:flex sm:justify-between sm:-mx-3">
        <TextField
          className="sm:flex-1 sm:px-3"
          label={t('register.first_name')}
          name="first_name"
        />

        <TextField
          className="sm:flex-1 sm:px-3"
          label={t('register.last_name')}
          name="last_name"
        />
      </div>

      <TextField label={t('register.mail')} name="email" autocomplete="off" placeholder={t('register.mail_placeholder')} />

      <div className="sm:flex sm:justify-between sm:-mx-3">
        <TextField
          className="sm:flex-1 sm:px-3"
          label={t('register.password')}
          type="password"
          name="password"
          autocomplete="off"
          placeholder={t('register.password_placeholder')}
        />

        <TextField
          className="sm:flex-1 sm:px-3"
          label={t('register.password_confirm')}
          type="password"
          autocomplete="off"
          name="password_confirmation"
          placeholder={t('register.password_confirm_placeholder')}
        />
      </div>
    </>
  );
};

RegisterStep.validationSchema = Yup.object().shape({
  account_type: Yup.string().required(),
  birthday: Yup.string().required(),
  first_name: Yup.string().required(),
  gender: Yup.number().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string().required()
});

export default RegisterStep;
