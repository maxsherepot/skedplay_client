import React from "react";
import PropTypes from "prop-types";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import {useTranslation} from "react-i18next";
import { getErrors } from "utils";
import { useSteps } from "hooks";
import { Button, FormGroup } from "UI";

function ForgotForm({ onSubmit, children }) {
  const { step, setStep } = useSteps();
  const {t, i18n} = useTranslation();
  React.useEffect(() => {
    document.querySelector('.modal__dialog').style.minWidth = '410px';
  });

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
    { setSubmitting, setStatus, setErrors }
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
        await onSubmit();
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
        phone: "",
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
            {t('common.step')} {step + 1} / {stepLength}
          </div>

          {activeStep}

          {status && (
            <FormGroup className="error text-center">
              <span>{status}</span>
            </FormGroup>
          )}

          <Button
            type="submit"
            className="text-xl min-w-full"
            disabled={isSubmitting}
          >
            {{
              0: t('forgot.send_verification_code'),
              1: t('forgot.check_verification_code'),
              2: t('forgot.confirm'),
              3: t('forgot.go_to_login_page')
            }[step] || t('forgot.next_step')}
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
