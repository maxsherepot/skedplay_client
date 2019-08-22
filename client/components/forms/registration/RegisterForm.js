import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import Link from "next/link";

import transformGraphQLValidationErrors from "utils";

// Old version submit function

function RegisterForm({ onSubmit, children }) {
  const [step, setStep] = useState(0);

  const activeStep = React.Children.toArray(children)[step];
  const isLastStep = step === React.Children.count(children) - 1;

  const previous = () => {
    setStep(Math.max(step - 1, 0));
  };

  const next = () => {
    setStep(Math.min(step + 1, children.length - 1));
  };

  const handleSubmits = async (values, { setSubmitting, setErrors }) => {
    if (activeStep.props.onPageSubmit) {
      await activeStep.props.onPageSubmit();
    }
    if (isLastStep) {
      try {
        await onSubmit({
          variables: {
            ...values
          }
        });
      } catch (e) {
        setErrors(transformGraphQLValidationErrors(e && e.graphQLErrors)[0]);
      }

      return;
    }

    setSubmitting(false);
    next();
  };

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
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className="block text-lg text-center mt-4 font-medium">
            Step {step + 1} / 3
          </div>

          {activeStep}

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
}

RegisterForm.Step = ({ children }) => children;

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegisterForm;
