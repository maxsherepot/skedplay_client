import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSteps } from "hooks";
import { Button, FormGroup, Loader } from "UI";
import { getErrors } from "utils";
import {useTranslation} from "react-i18next";
import redirect from "lib/redirect";
import cx from 'classnames';

function EditEmployeeForm({ withStep, onLastStep, initialValues, children }) {
  const { step, setStep } = useSteps();


  const {t, i18n} = useTranslation();

  const activeStep = React.Children.toArray(children)[step].props.children;
  const totalSteps = React.Children.toArray(children).length
  const isLastStep = step === (totalSteps - 1)

  const onNextStep = (status) => {
      if (status) {
          if (withStep) {
              if (isLastStep) {
                  onLastStep && onLastStep()
                  redirect(undefined, "/account")
                  setStep(0)
              } else {
                  setStep(step + 1)
              }
              window.scrollTo(0, 0)
          }
      }

  }

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
      return status
    }

    // if (isLastStep) {
    //   try {
    //     setStep(0);
    //     Router.back();
    //   } catch (e) {
    //     if (getErrors(e) instanceof Object) {
    //       setErrors(getErrors(e));
    //     }
    //   }
    //   return;
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status, submitForm }) => (
        <form onSubmit={handleSubmit} className="edit-employee-form">
          {isSubmitting && <Loader/>}

          <div className="flex flex-col items-start mx-auto hd:w-7/12 my-5">
            <div className="w-full sm:p-8 hd:p-0">
              {activeStep}

              {status && (
                <FormGroup className="error text-center">
                  <span>{status}</span>
                </FormGroup>
              )}
            </div>
          </div>

          <div className="border-b border-divider" />
          {
              withStep ?
                  <div className="flex flex-col items-start mx-auto hd:w-7/12">
                    <div className="w-full p-8 hd:px-0 flex flex-col-reverse sm:block">
                      <Button
                        level={step <= 0 ? "grey" : "secondary-light"}
                        className="w-full sm:w-auto text-xl px-16 sm:mr-4"
                        onClick={() => {setStep(step - 1); window.scrollTo(0, 0)}}
                        type="button"
                        disabled={isSubmitting}
                      >
                        {t('common.back')}
                      </Button>
                      <Button
                        onClick={() => submitForm().then(() => onNextStep(true))}
                        className="w-full sm:w-auto text-xl px-16 mb-4 md:mb-0"
                        disabled={isSubmitting}
                      >
                        {isLastStep ? t('ad.save') : t('common.next')}
                      </Button>
                    </div>
                  </div>

                  :

                  <div
                    className={cx([
                      "flex flex-col items-start mx-auto hd:w-7/12",
                      activeStep.props.showSubmit === false ? 'hidden' : '',
                    ])}
                  >
                    <div className="w-full xs:p-8 xs:px-0 hd:px-0">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto text-xl px-16"
                        disabled={isSubmitting}
                      >
                        {t('common.save')}
                      </Button>
                    </div>
                  </div>
          }

        </form>
      )}
    </Formik>
  );
}

EditEmployeeForm.Step = ({ children }) => children;

EditEmployeeForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
};

export default EditEmployeeForm;
