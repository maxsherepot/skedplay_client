import React, {useState} from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";
import Link from "next/link";
import cx from "classnames";
import moment from 'moment';

import { useSteps } from "hooks";
import { Button, FormGroup, Popup } from "UI";
import { getErrors } from "utils";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

function RegisterForm({ onSubmit, children }) {
  const {query} = useRouter();
  const { t, i18n } = useTranslation();
  const { step, setStep } = useSteps();
  const [agePopupShow, setAgePopupShow] = useState(false);

  const stepLength = React.Children.count(children);
  const activeStep = React.Children.toArray(children)[step];
  const isLastStep = step === React.Children.count(children) - 1;

  React.useEffect(() => {
    document.querySelector('.modal__content').style.maxWidth = isLastStep ? '700px' : '410px';
    document.querySelector('.modal__dialog').style.minWidth = '410px';
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

      let birthday = moment(values.birthday, 'DD.MM.YYYY');

      if (birthday && moment().diff(birthday, 'years') < 18) {
        setAgePopupShow(true);

        setSubmitting(false);

        return;
      }

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
        account_type: query.role || "",
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
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Popup
            title={t('register.small_age_title')}
            open={agePopupShow}
            closeOnDocumentClick
            onClose={() => setAgePopupShow(false)}
          >
            <h3 className="mt-3">{t('register.small_age_text')}</h3>
          </Popup>

          <div className="block text-lg text-center mt-4 font-medium">
            {t('common.step')} {step + 1} / {stepLength}
          </div>

          {activeStep}

          {status && (
            <FormGroup className="error text-center">
              <span>{status}</span>
            </FormGroup>
          )}

          {step === 0 && (
            <div className="block text-xs text-center leading-normal mb-8 px-6">
              {t('register.agree')}
            </div>
          )}

          <div className={cx([
            "flex flex-col justify-between mt-4",
            isLastStep ? "md:flex-row" : ""
          ])}>
            <Button
              type="submit"
              className="text-xl px-8 sm:px-25 mx-auto mb-3"
              disabled={isSubmitting}
            >
              {isLastStep ? `${t('common.create_account')}` : `${t('common.next_step')}`}
            </Button>
            {step === 0 && (
              <Link href="/login">
                <Button
                  className="text-xl px-8 sm:px-12 mb-3 ml-1"
                  disabled={isSubmitting}
                  outline
                  level="primary-black"
                >
                  {t('register.already_have_account')}
                </Button>
              </Link>
            )}
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
