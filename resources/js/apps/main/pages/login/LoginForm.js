import React, { Component, Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import transformGraphQLErrors from '@/utils';

class LoginForm extends Component {
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
    const { onSubmit, error } = this.props;

    return (
      <Formik
        initialValues={{ username: '', password: '', recaptcha: 'afafafafaf' }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Field is required'),
          password: Yup.string().required('Field is required'),
          // recaptcha: Yup.string().required('Field is required'),
        })}
        onSubmit={async ({ username, password, recaptcha }, { setSubmitting, setErrors }) => {
          console.log(error);

          await onSubmit({
            variables: {
              username,
              password,
              recaptcha,
            },
          }).then(res => console.log(res));

          // if (error && error.graphQLErrors.length) {
          //   console.log(transformGraphQLErrors(error.graphQLErrors)[0]);
          // }

          // setErrors();
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, touched, errors, setFieldValue }) => (
          <Fragment>
            <Form onSubmit={handleSubmit}>
              <Field type="email" name="username" />
              <ErrorMessage name="username" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              {/* <div className="form-group">
                <Recaptcha
                  sitekey="6LdhMbIUAAAAAJwdU2c6JCp1w4t9yhtzc6aJt0nT"
                  render="explicit"
                  verifyCallback={response => {
                    setFieldValue('recaptcha', response);
                  }}
                  onloadCallback={() => {}}
                />
                {errors.recaptcha && touched.recaptcha && <p>{errors.recaptcha}</p>}
              </div> */}
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          </Fragment>
        )}
      </Formik>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default LoginForm;
