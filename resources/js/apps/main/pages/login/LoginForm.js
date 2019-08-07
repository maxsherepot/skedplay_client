import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const LoginForm = ({ onLogin }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={Yup.object().shape({
      username: Yup.string().required('Field is required'),
      password: Yup.string().required('Field is required'),
    })}
    onSubmit={({ username, password }, { setSubmitting }) => {
      onLogin({
        variables: {
          username,
          password,
        },
      });
      setSubmitting(false);
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <Fragment>
        <Form onSubmit={handleSubmit}>
          <Field type="email" name="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      </Fragment>
    )}
  </Formik>
);

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
