import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";

import { useSteps } from "hooks";
import { Button } from "components/Ui";
import { transformValidationErrors } from "utils";

function ForgotForm({ onSubmit, children }) {
  const { step, setStep } = useSteps("forgot");

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

  const handleSubmits = async (values, { setSubmitting, setErrors }) => {
    let result = true;

    if (activeStep.props.onStepSubmit) {
      result = await activeStep.props.onStepSubmit(values);
    }

    if (isLastStep) {
      try {
        await onSubmit({
          variables: {
            ...values
          }
        });
      } catch (e) {
        setErrors(transformValidationErrors(e));
      }
      return;
    }

    setSubmitting(false);

    if (result) {
      next();
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
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="block text-lg text-center mt-4 font-medium">
            Step {step + 1} / 3
          </div>

          {activeStep}

          <Button
            type="submit"
            className="text-xl min-w-full"
            disabled={isSubmitting}
          >
            {isLastStep ? "Sign Up" : "Next step"}
          </Button>
        </form>
      )}
    </Formik>
  );
}

ForgotForm.Step = ({ children }) => children;

ForgotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ForgotForm;
