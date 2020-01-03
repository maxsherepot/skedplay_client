import React, { useState } from "react";
import { Formik, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Link from "next/link";

import { TextField, PhoneField, CheckboxField, Button, FormGroup } from "UI";
import { getErrors } from "utils";
import Captcha from "components/Captcha";

const LoginForm = ({ onSubmit }) => {
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
        recaptcha: Yup.string().required()
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
            label="Phone number"
            name="username"
            placeholder="Your phone number"
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Your password"
          />

          {error && (
            <FormGroup className="error text-center">
              <span>{error}</span>
            </FormGroup>
          )}

          <div className="flex px-3 my-5">
            <div className="w-1/2">
              <CheckboxField label="Remember me" name="remember_me"  />
            </div>
            <div className="w-1/2 text-right">
              <Link href="/forgot">
                <a className="text-sm transition hover:opacity-75">
                  Lost your password?
                </a>
              </Link>
            </div>
          </div>

          <div className="flex justify-center my-5">
            <Field name="recaptcha" as={Captcha} />
          </div>

          <Button
            className="text-xl min-w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </Button>

          <Link href="/register">
            <a className="block mt-5 text-center text-red transition hover:text-pink text-lg">
              Create account
            </a>
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
