import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import transformGraphQLValidationErrors from '@/utils';
import Captcha from '@/components/Captcha';

const RegisterForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        account_type: 'client',
        first_name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        recaptcha: '',
      }}
      validationSchema={Yup.object().shape({
        account_type: Yup.string().required('Field is required'),
        first_name: Yup.string().required('Field is required'),
        phone: Yup.string().required('Field is required'),
        email: Yup.string().required('Field is required'),
        password: Yup.string().required('Field is required'),
        password_confirmation: Yup.string().required('Field is required'),
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
          <Field type="text" name="first_name" placeholder="First name" />
          <ErrorMessage name="first_name" component="div" />
          <Field type="text" name="phone" placeholder="Phone" />
          <ErrorMessage name="phone" component="div" />
          <Field type="text" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="password_confirmation" placeholder="Password confirmation" />
          <ErrorMessage name="password_confirmation" component="div" />
          <Field name="recaptcha" setFieldValue={setFieldValue} component={Captcha} />
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
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
