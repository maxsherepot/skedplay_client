import {Popup} from 'UI';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Field, Formik, useFormikContext} from "formik";
import React, {useState} from "react";
import { GET_EMPLOYEE_COMPLAINT_THEMES, CREATE_EMPLOYEE_COMPLAINT } from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Loader, TextField, TextAreaField, Button, SelectField} from 'UI';
import Captcha from "components/Captcha";
import translation from "services/translation";

const EmployeeComplaintPopup = ({user, employeeId, trigger, title, onSuccess}) => {
  const { t, i18n } = useTranslation();

  const [createEmployeeComplaint] = useMutation(CREATE_EMPLOYEE_COMPLAINT);

  const { loading, data: { employeeComplaintThemes } = {} } = useQuery(
    GET_EMPLOYEE_COMPLAINT_THEMES
  );

  if (loading) {
    return <Loader/>;
  }

  const defaultTitle = (
    <h3 className="text-black">{t('complaint_popup.title')}</h3>
  );

  const onSubmit = async values => {
    await createEmployeeComplaint({
      variables: {
        input: {
          employee_id: employeeId,
          ...values
        }
      }
    });

    document.querySelector('.popup-overlay').click();

    if (onSuccess) {
      onSuccess();
    }
  };

  let validationSchema = {
    theme_id: Yup.number().required(),
    message: Yup.string().required(),
  };

  if (!user) {
    validationSchema = {
      ...validationSchema,
      name: Yup.string().required(),
      email: Yup.string().required(),
      recaptcha: Yup.string().required(),
    };
  }

  return (
    <Popup
      trigger={trigger}
      title={title || defaultTitle}
      contentStyle={{
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <div className="text-left mb-5">
        <Formik
          initialValues={{
            theme_id: '',
            name: '',
            email: '',
            message: '',
            recaptcha: '',
          }}
          validationSchema={Yup.object().shape({
            ...validationSchema
          })}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="text-black mt-3">
                <SelectField
                  // className="w-full sm:w-1/3 px-2"
                  label={t('complaint_popup.theme')}
                  placeholder=""
                  name={`theme_id`}
                  options={employeeComplaintThemes.map(theme => ({
                    value: theme.id,
                    label: translation.getLangField(theme.name, i18n.language),
                  }))}
                />

                {!user &&
                  <>
                    <TextField
                      label={t('complaint_popup.name')}
                      name="name"
                      placeholder={t('complaint_popup.name_placeholder')}
                    />

                    <TextField
                      label={t('complaint_popup.email')}
                      name="email"
                      type="email"
                      placeholder={t('complaint_popup.email_placeholder')}
                    />
                  </>
                }

                <TextAreaField
                  label={t('complaint_popup.message')}
                  name="message"
                  placeholder={t('complaint_popup.message_placeholder')}
                  textLength={3000}
                  rows={4}
                />

                {!user &&
                  <div className="flex justify-center my-5">
                    <Field name="recaptcha" as={Captcha} />
                  </div>
                }

                <Button
                  className="text-xl min-w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t('common.send')}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Popup>
  );
};

export default EmployeeComplaintPopup;