import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import transformGraphQLValidationErrors from "utils";
import Captcha from "components/Captcha";
import { BirthdayInput } from "components/forms";

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
      {({ handleSubmit, isSubmitting, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Field type="text" name="first_name" placeholder="First name" />
          <ErrorMessage name="first_name" component="div" />
          <Field type="text" name="phone" placeholder="Phone" />
          <ErrorMessage name="phone" component="div" />
          <Field type="text" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />

          <Field type="text" name="gender" placeholder="Gender" />
          <ErrorMessage name="gender" component="div" />

          <BirthdayInput />

          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
          />
          <ErrorMessage name="password_confirmation" component="div" />
          <Field
            name="recaptcha"
            setFieldValue={setFieldValue}
            component={Captcha}
          />
          <ErrorMessage name="recaptcha" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegisterForm;
