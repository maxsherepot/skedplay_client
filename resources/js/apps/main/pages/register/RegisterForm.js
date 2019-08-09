import React, { Component, Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import transformGraphQLValidationErrors from '@/utils';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    const { onSubmit } = this.props;

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
        {({ handleSubmit, isSubmitting, touched, errors, setFieldValue }) => (
          <Fragment>
            <Form onSubmit={handleSubmit}>
              <Field type="text" name="first_name" placeholder="First name" />
              <ErrorMessage name="first_name" component="div" />
              <Field type="text" name="phone" placeholder="Phone" />
              <ErrorMessage name="phone" component="div" />
              <Field type="text" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
              <Field
                type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
              />
              <ErrorMessage name="password_confirmation" component="div" />

              <div className="form-group">
                <Recaptcha
                  sitekey="6LdhMbIUAAAAAJwdU2c6JCp1w4t9yhtzc6aJt0nT"
                  render="explicit"
                  verifyCallback={response => {
                    setFieldValue('recaptcha', response);
                  }}
                  onloadCallback={() => {}}
                />
                {errors.recaptcha && touched.recaptcha && <p>{errors.recaptcha}</p>}
              </div>
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </Form>
          </Fragment>
        )}
      </Formik>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
