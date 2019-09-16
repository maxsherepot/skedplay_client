import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";

import { useSteps } from "hooks";
import { Button, FormGroup } from "UI";
import { getErrors } from "utils";

function NewAdForm({ onSubmit, children }) {
  const { step, setStep } = useSteps("newAd");

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
        next();
      }
    }

    if (isLastStep) {
      try {
        // await onSubmit({
        //   variables: {
        //     ...values
        //   }
        // });
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
        account_type: "client"
      }}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mx-auto hd:w-7/12 my-5">
            <div className="p-8 hd:p-0">
              {activeStep}

              {status && (
                <FormGroup className="error text-center">
                  <span>{status}</span>
                </FormGroup>
              )}
            </div>
          </div>
          <div className="border-b border-divider"></div>
          {/* afaf */}
          {/* <Button
            type="submit"
            className="text-xl min-w-full"
            disabled={isSubmitting}
          >
            {isLastStep ? "Save ad" : "Next"}
          </Button> */}
        </form>
      )}
    </Formik>
  );
}

NewAdForm.Step = ({ children }) => children;

NewAdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewAdForm;
