import React, { useState } from "react";
import { Formik, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { TextField, TextAreaField, CheckboxField, Button, FormGroup } from "UI";
import { getErrors } from "utils";
import Captcha from "components/Captcha";
import {useTranslation} from "react-i18next";

const NewReviewForm = ({ employee, onSubmit }) => {
  const [error, setError] = useState(null);
  const {t, i18n} = useTranslation();

  return (
    <Formik
      initialValues={{
        email: "",
        title: "",
        body: "",
        recaptcha: "",
        hide: false
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        title: Yup.string().required(),
        body: Yup.string().required(),
        recaptcha: Yup.string().required()
      })}
      onSubmit={async (
        values,
        { setSubmitting, setErrors, setStatus, resetForm }
      ) => {
        try {
          await onSubmit({
            variables: {
              employee: employee.id,
              input: values
            }
          });

          resetForm({});

          setStatus({ success: true });
        } catch (e) {
          setStatus({ success: false });

          if (getErrors(e) instanceof Object) {
            setErrors(getErrors(e));
          } else {
            setError(getErrors(e));
          }
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          {status && (
            <FormGroup className="text-dark-green text-center">
              <span>{t('review.review_successfully_added')}</span>
            </FormGroup>
          )}

          <TextField label={t('review.email')} name="email" placeholder="" />

          <TextField label={t('review.short_title')} name="title" placeholder="" />

          <TextAreaField
            label={t('review.describe_your_impressions')}
            name="body"
            styleTextLength={{display: "none"}}
            placeholder=""
          />

          {error && (
            <FormGroup className="error text-center">
              <span>{error}</span>
            </FormGroup>
          )}

          <div className="flex px-3 my-5">
            <CheckboxField label={t('review.hide_my_name')} name="hide" />
          </div>

          {/*<div className="flex justify-center my-5">
            <Field name="recaptcha" as={Captcha} />
          </div>*/}

          <Button
            className="text-xl min-w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {t('review.send')}
          </Button>
        </form>
      )}
    </Formik>
  );
};

NewReviewForm.propTypes = {
  employee: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NewReviewForm;
