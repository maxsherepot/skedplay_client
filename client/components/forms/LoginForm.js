import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import transformGraphQLValidationErrors from "utils";
import Captcha from "components/Captcha";
import { InputField } from "components/forms";

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ phone_number: "", password: "", recaptcha: "" }}
      validationSchema={Yup.object().shape({
        phone_number: Yup.string().required(), // Todo: add phone number validation
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
          console.log(e.graphQLErrors);
          setErrors(transformGraphQLValidationErrors(e && e.graphQLErrors)[0]);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          <InputField
            label="Phone number"
            name="phone_number"
            error={
              touched.phone_number && errors.phone_number
                ? errors.phone_number
                : null
            }
          />

          <InputField
            label="Password"
            name="password"
            error={touched.password && errors.password ? errors.password : null}
          />

          <Field
            name="recaptcha"
            setFieldValue={setFieldValue}
            component={Captcha}
          />
          <ErrorMessage name="recaptcha" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
