import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSteps } from "hooks";
import { CheckboxField, TextField, Button, FormGroup, Loader } from "UI";
import { getErrors } from "utils";
import {useTranslation} from "react-i18next";
import redirect from "lib/redirect";
import cx from 'classnames';

function SubscribeForm({ initialValues, children }) {
  const {t, i18n} = useTranslation();


  const validate = values => {
    return {};
  };


  const handleSubmits = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status, submitForm }) => (
        <form onSubmit={handleSubmit} className="edit-employee-form w-full">
          {isSubmitting && <Loader/>}

          <h2 className="text-2xl sm:text-3xl font-bold mb-1">Get Notified!</h2>
          <p className="text-md text-grey mb-6">Subscribe for Updates and Keep track of all things from this Worker </p>

          <TextField
            className="w-full"
            inputClassName="w-1/3"
            label={"Your email address"}
            name="name"
          />

      <div className="w-full mt-10 mb-4">
                <Button
                  type="submit"
                  size="xs"
                  className="w-full sm:w-auto text-xl px-16"
                  disabled={isSubmitting}
                >
                  Subscribe!
                </Button>
              </div>

              <div className="flex items-center mt-6 px-2 mb-6 ">
                  <div className="text-grey text-sm row">
                     To learn how we process your data, visit our
                       <a href="/helpcenter/private-policy" className="underline pl-1">{t('layout.privacy_policy')}</a>.
                           You can unsubscribe at any time without costs.
                   </div>
                  </div>

        </form>
      )}
    </Formik>
  );
}



export default SubscribeForm;
