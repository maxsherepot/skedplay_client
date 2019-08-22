import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Link from "next/link";

import transformGraphQLValidationErrors from "utils";

class RegisterForm extends React.Component {
  static Step = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  render() {
    const { onSubmit, children } = this.props;
    const { step } = this.state;
    const activeStep = React.Children.toArray(children)[step];
    const isLastStep = step === React.Children.count(children) - 1;

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
            await onSubmit({
              variables: {
                ...values
              }
            });
          } catch (e) {
            setErrors(
              transformGraphQLValidationErrors(e && e.graphQLErrors)[0]
            );
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, touched, errors, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {/** Add multistep logic */}
            <div className="block text-lg text-center mt-4 font-medium">
              Step {step} / 3
            </div>

            {activeStep}

            <button
              className="btn text-xl"
              type="submit"
              disabled={isSubmitting}
            >
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
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegisterForm;
