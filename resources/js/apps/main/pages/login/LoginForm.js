import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
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
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        {errors.username && touched.username && errors.username}
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    )}
  </Formik>
);

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
