import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";
import Link from "next/link";
import cx from "classnames";

import { useSteps } from "hooks";
import { Button, FormGroup } from "UI";
import { getErrors } from "utils";

function RegisterForm({ onSubmit, children }) {
  const { step, setStep } = useSteps();

  const stepLength = React.Children.count(children);
  const activeStep = React.Children.toArray(children)[step];
  const isLastStep = step === React.Children.count(children) - 1;

  React.useEffect(() => {
    const maxWidth = isLastStep ? '700px' : '410px';

    document.querySelector('.modal__content').style.maxWidth = maxWidth;
  });

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
      const { status, message, errors } = await activeStep.props.onStepSubmit(
        values
      );

      setSubmitting(false);

      if (errors instanceof Object) {
        setErrors(errors);
      } else if (!status && message) {
        setStatus(message);
      }

      if (status) {
        await next();
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
        if (getErrors(e) instanceof Object) {
          setErrors(getErrors(e));
        }
      }
      return;
    }
  };

  return (
    <Formik
      initialValues={{
        account_type: "",
        birthday: "",
        first_name: "",
        phone: "",
        email: "",
        gender: "",
        password: "",
        password_confirmation: "",
        recaptcha: "",
        code: ""
      }}
      // validate={validate}
      validationSchema={activeStep.props.validationSchema || {}}
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

          <div className={cx([
            "flex flex-col justify-between mt-4",
            isLastStep ? "md:flex-row" : ""
          ])}>
            <Button
              type="submit"
              className="text-xl px-8 sm:px-25 mb-3"
              disabled={isSubmitting}
            >
              Next step
            </Button>

            <Link href="/login">
              <Button
                className="text-xl px-8 sm:px-12 mb-3 ml-1"
                disabled={isSubmitting}
                outline
                level="primary-black"
              >
                Already have an account
              </Button>
            </Link>
          </div>
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
