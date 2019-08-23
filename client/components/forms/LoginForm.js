import React from "react";
import { Formik, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Link from "next/link";

import transformGraphQLValidationErrors from "utils";
import Captcha from "components/Captcha";
import { TextField, Checkbox } from "components/ui";

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        recaptcha: "",
        remember_me: ""
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(), // Todo: add phone number validation
        password: Yup.string().required(),
        recaptcha: Yup.string().required(),
        remember_me: Yup.bool()
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await onSubmit({
            variables: {
              ...values
            }
          });
        } catch (e) {
          setErrors(transformGraphQLValidationErrors(e && e.graphQLErrors)[0]);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <TextField className="mt-4" label="Phone number" name="username" />

          <TextField label="Password" type="password" name="password" />

          <div className="flex px-3 my-5">
            <div className="w-1/2">
              <Checkbox label="Remember me" name="remember_me" />
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

          <button type="submit" className="btn text-xl" disabled={isSubmitting}>
            Login
          </button>

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
