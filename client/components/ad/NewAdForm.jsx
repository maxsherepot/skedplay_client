import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import redirect from "lib/redirect";
import { useSteps } from "hooks";
import { Button, FormGroup, Loader } from "UI";
import { getErrors } from "utils";
import {useTranslation} from "react-i18next";
import {useApolloClient} from "@apollo/react-hooks";

function NewAdForm({ children, clubId }) {
  const { step, setStep } = useSteps();
  const {t, i18n} = useTranslation();

  const apolloClient = useApolloClient();

  const activeStep = React.Children.toArray(children)[step];
  const isLastStep = step === React.Children.count(children) - 1;

  const prev = () => {
    let currentStep = step <= 0 ? 0 : step - 1;
    setStep(currentStep);
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
        // setStep(0);
        if (clubId) {
          redirect({}, `/account/club/${clubId}`);
        } else {
          redirect({}, "/account");
        }
      } catch (e) {
        if (getErrors(e) instanceof Object) {
          setErrors(getErrors(e));
        }
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        birthday: "",
        gender: "",
        race_type_id: "",
        type: "",
        description: "",
        index: "",
        city_id: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        prices: {},
        services: {},
        parameters: {},
        languages: [],
        service_for: [],
        schedule: [
          {
            day: 0,
            start: null,
            end: null,
            available: true,
            order: 6,
            employee_id: null,
            club_id: null
          },
          {
            day: 1,
            start: null,
            end: null,
            available: true,
            order: 0,
            employee_id: null,
            club_id: null
          },
          {
            day: 2,
            start: null,
            end: null,
            available: true,
            order: 1,
            employee_id: null,
            club_id: null
          },
          {
            day: 3,
            start: null,
            end: null,
            available: true,
            order: 2,
            employee_id: null,
            club_id: null
          },
          {
            day: 4,
            start: null,
            end: null,
            available: true,
            order: 3,
            employee_id: null,
            club_id: null
          },
          {
            day: 5,
            start: null,
            end: null,
            available: true,
            order: 4,
            employee_id: null,
            club_id: null
          },
          {
            day: 6,
            start: null,
            end: null,
            available: true,
            order: 5,
            employee_id: null,
            club_id: null
          }
        ],
        photos: [],
        videos: []
      }}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          {isSubmitting && <Loader/>}
          <div className="flex flex-col items-start mx-auto hd:w-7/12 my-5">
            <div className="w-full p-8 hd:p-0">
              {activeStep}

              {status && (
                <FormGroup className="error text-center">
                  <span>{status}</span>
                </FormGroup>
              )}
            </div>
          </div>

          <div className="border-b border-divider" />

          <div className="flex flex-col items-start mx-auto hd:w-7/12">
            <div className="w-full p-8 hd:px-0">
              <Button
                level={step <= 0 ? "grey" : "primary"}
                className="text-xl px-16 mb-4 md:mb-0 sm:mr-4"
                onClick={() => prev()}
                type="button"
                disabled={isSubmitting}
              >
                {t('common.back')}
              </Button>
              <Button
                type="submit"
                className="text-xl px-16"
                disabled={isSubmitting}
              >
                {isLastStep ? t('ad.save') : t('common.next')}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

NewAdForm.Step = ({ children }) => children;

export default NewAdForm;
