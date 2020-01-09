import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Link from "next/link";

import { TextField, PhoneField, CheckboxField, Button, FormGroup } from "UI";
import { getErrors } from "utils";
import Captcha from "components/Captcha";
import {useTranslation} from "react-i18next";

const LoginForm = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState(null);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        recaptcha: "",
        remember_me: false
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(), // Todo: add phone number validation
        password: Yup.string().required(),
        // recaptcha: Yup.string().required()
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await onSubmit({
            variables: {
              ...values
            }
          });
        } catch (e) {
          if (getErrors(e) instanceof Object) {
            setErrors(getErrors(e));
          } else {
            setError(getErrors(e));
          }
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <PhoneField
            className="mt-4"
            label={t('login.phone_number')}
            name="username"
            placeholder={t('login.phone_number_placeholder')}
          />

          <TextField
            label={t('login.password')}
            type="password"
            name="password"
            placeholder={t('login.password_placeholder')}
          />

          {error && (
            <FormGroup className="error text-center">
              <span>{error}</span>
            </FormGroup>
          )}

          <div className="flex px-3 my-5">
            <div className="w-1/2">
              <CheckboxField label={t('login.remember_me')} name="remember_me" checkboxClass="black-border" />
            </div>
            <div className="w-1/2 text-right">
              <Link href="/forgot">
                <a className="text-sm text-pink transition hover:opacity-75">
                  {t('login.password_lost')}
                </a>
              </Link>
            </div>
          </div>

          {/*<div className="flex justify-center my-5">*/}
            {/*<Field name="recaptcha" as={Captcha} />*/}
          {/*</div>*/}

          <Button
            className="text-xl min-w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {t('common.login')}
          </Button>

          <Link href="/register">
            <Button
              className="text-xl min-w-full mt-3"
              type="submit"
              disabled={isSubmitting}
            >
              {t('common.create_account')}
            </Button>
          </Link>
        </form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
