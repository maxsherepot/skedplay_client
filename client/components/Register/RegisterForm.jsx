import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";
import Link from "next/link";

import { useSteps } from "hooks";
import { Button, FormGroup } from "UI";
import { transformValidationErrors } from "utils";

function RegisterForm({ onSubmit, children }) {
  const { step, setStep } = useSteps("register");

  const stepLength = React.Children.count(children);
  const activeStep = React.Children.toArray(children)[step];
  const isLastStep = step === React.Children.count(children) - 1;

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

  const handleSubmits = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
    setStatus(null);

    if (activeStep.props.onStepSubmit) {
      const { status, message } = await activeStep.props.onStepSubmit(values);

      setSubmitting(false);

      if (status) {
        next();
      } else if (!status && message) {
        setStatus(message);
      }
    }

    if (isLastStep) {
      try {
        await onSubmit({
          variables: {
            ...values
          }
        });
        setStep(0);
      } catch (e) {
        setErrors(transformValidationErrors(e));
      }
      return;
    }
  };

  return (
    <Formik
      initialValues={{
        account_type: "client",
        first_name: "",
        phone: "",
        email: "",
        gender: "",
        password: "",
        password_confirmation: "",
        recaptcha: "",
        code: ""
      }}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="block text-lg text-center mt-4 font-medium">
            Step {step + 1} / {stepLength}
          </div>

          {activeStep}

          {status && (
            <FormGroup className="error text-center">
              <span>{status}</span>
            </FormGroup>
          )}

          {step === 0 && (
            <div className="block text-xs text-center leading-normal mb-8 px-6">
              By clicking the “sing up” button, I agree to the terms of service
              and personal data processing policy
            </div>
          )}

          <Button
            type="submit"
            className="text-xl min-w-full"
            disabled={isSubmitting}
          >
            {isLastStep ? "Sign Up" : "Next step"}
          </Button>

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
