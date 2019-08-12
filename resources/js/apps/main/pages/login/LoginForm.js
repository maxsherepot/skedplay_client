import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import transformGraphQLValidationErrors from '@/utils';
import Captcha from '@/components/Captcha';

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '', recaptcha: '' }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Field is required'),
        password: Yup.string().required('Field is required'),
        recaptcha: Yup.string().required('Field is required'),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await onSubmit({
            variables: {
              ...values,
            },
          });
        } catch (e) {
          setErrors(transformGraphQLValidationErrors(e && e.graphQLErrors)[0]);
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Field type="email" name="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field name="recaptcha" setFieldValue={setFieldValue} component={Captcha} />
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
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
