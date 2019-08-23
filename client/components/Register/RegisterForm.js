import React, { useState } from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";
import Link from "next/link";

import transformGraphQLValidationErrors from "utils";

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

  const validate = values => {
    if (activeStep.props.validationSchema) {
      try {
        validateYupSchema(values, activeStep.props.validationSchema, true);
      } catch (err) {
        return yupToFormErrors(err);
      }
    }

    return {};
  };

  const handleSubmits = async (values, { setSubmitting, setErrors }) => {
    if (activeStep.props.onStepSubmit) {
      await activeStep.props.onStepSubmit(values);
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
        password: "",
        password_confirmation: "",
        recaptcha: "",
        code: ""
      }}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="block text-lg text-center mt-4 font-medium">
            Step {step + 1} / 3
          </div>

          {activeStep}

          <button type="submit" className="btn text-xl" disabled={isSubmitting}>
            Next step
          </button>
          <Link href="/login">
            <a className="block mt-5 text-center text-red transition hover:text-pink text-lg">
              Already have an account
            </a>
          </Link>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.Step = ({ children }) => children;

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegisterForm;
