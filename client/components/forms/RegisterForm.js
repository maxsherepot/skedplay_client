import React from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Link from "next/link";

import transformGraphQLValidationErrors from "utils";
import { TextField } from "components/forms";
import Captcha from "components/Captcha";

const RegisterForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        account_type: "client",
        first_name: "",
        phone: "",
        email: "",
        gender: 1,
        birthday: "",
        password: "",
        password_confirmation: "",
        recaptcha: ""
      }}
      validationSchema={Yup.object().shape({
        account_type: Yup.string().required(),
        first_name: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().required(),
        gender: Yup.number().required(),
        birthday: Yup.string().required(),
        password: Yup.string().required(),
        password_confirmation: Yup.string().required(),
        recaptcha: Yup.string().required()
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const birthday = new Date(values.birthday);

          await onSubmit({
            variables: {
              ...values,
              birthday
            }
          });
        } catch (e) {
          setErrors(transformGraphQLValidationErrors(e && e.graphQLErrors)[0]);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          {/** Add multistep logic */}
          <div className="block text-lg text-center mt-4 font-medium">
            Step 1 / 3
          </div>

          <TextField
            className="mt-4"
            label="Phone number"
            name="username"
            error={touched.username && errors.username ? errors.username : null}
          />

          <div className="flex justify-center my-4">
            <Field
              name="recaptcha"
              setFieldValue={setFieldValue}
              error={
                touched.password && errors.password ? errors.password : null
              }
              component={Captcha}
            />
          </div>

          <div className="block text-xs text-center leading-normal mb-8 px-6">
            By clicking the “sing up” button, I agree to the terms of service
            and personal data processing policy
          </div>
          <button className="btn text-xl" type="submit" disabled={isSubmitting}>
            Next step
          </button>
          <Link href="/login">
            <a className="block mt-5 text-center text-red transition hover:text-pink text-lg">
              Already have an account
            </a>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegisterForm;
