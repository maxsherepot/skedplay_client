import React from "react";
import * as Yup from "yup";

import { TextField, CheckboxField, ButtonGroupField, DateRawField } from "UI";
import {useTranslation} from "react-i18next";

const RegisterStep = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
    <div className="mt-4 mb-4 sm:mb-8">
        <ButtonGroupField
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
    </div>

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

      <TextField label={t('register.mail')} name="email" autoComplete="new-password" placeholder={t('register.mail_placeholder')} />

      <div className="sm:flex sm:justify-between sm:-mx-3">
        <TextField
          className="sm:flex-1 sm:px-3"
          label={t('register.password')}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder={t('register.password_placeholder')}
        />

        <TextField
          className="sm:flex-1 sm:px-3"
          label={t('register.password_confirm')}
          type="password"
          autoComplete="new-password"
          name="password_confirmation"
          placeholder={t('register.password_confirm_placeholder')}
        />
      </div>
      <div className="flex items-center mt-2 px-2 mb-6 ">
        <CheckboxField
          label={(
              <div className="text-grey text-sm row">
                 {t('register.creating_account_you_agree')}
                 <a href="/helpcenter/terms-of-use" className="underline pr-1">{t('register.terms_conditions')}</a>
                   {t('common.and')}
                   <a href="/helpcenter/private-policy" className="underline pl-1">{t('layout.privacy_policy')}</a>.
               </div>
          )}
          name={'creating_account_you_agree'}
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
  password_confirmation: Yup.string().required(),
  creating_account_you_agree: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

export default RegisterStep;
