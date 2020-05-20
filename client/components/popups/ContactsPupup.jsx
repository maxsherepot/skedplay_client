import {Popup} from 'UI';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Field, Formik, useFormikContext} from "formik";
import React, {useState} from "react";
import { CONTACT_PHONES, CREATE_CONTACT_REQUEST } from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Loader, TextField, TextAreaField, Button} from 'UI';
import Captcha from "components/Captcha";

const Phones = () => {
  const { loading, data: { contactPhones } = {} } = useQuery(
    CONTACT_PHONES
  );

  if (loading) {
    return <Loader/>;
  }

  if (!contactPhones) {
    return '';
  }

  return (
    <div className="flex flex-col text-black">
      {contactPhones.map(phone => {
        return (
          <div className="pb-1" key={phone.phone}>
            {phone.phone}
          </div>
        )
      })}
    </div>
  );
};

const ContactsPopup = ({user, trigger, title, onSuccess}) => {
  const { t, i18n } = useTranslation();

  const defaultTrigger = (
    <li className="w-1/3 cursor-pointer">
      {t('layout.contacts')}
    </li>
  );

  const defaultTitle = (
    <h3 className="text-black">{t('contacts_popup.title')}</h3>
  );

  const [createContactRequest] = useMutation(CREATE_CONTACT_REQUEST);

  const onSubmit = async values => {
    await createContactRequest({
      variables: {
        input: {
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
    theme: Yup.string().required(),
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
      trigger={trigger || defaultTrigger}
      title={title || defaultTitle}
      contentStyle={{
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <h3 className="mb-2 text-black">{t('contacts_popup.text')}</h3>

      <Phones/>

      <div className="text-left mb-5">
        <Formik
          initialValues={{
            theme: '',
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
                <TextField
                  label={t('contacts_popup.theme')}
                  name="theme"
                  placeholder={t('contacts_popup.theme_placeholder')}
                />

                {!user &&
                  <>
                    <TextField
                      label={t('contacts_popup.name')}
                      name="name"
                      placeholder={t('contacts_popup.name_placeholder')}
                    />

                    <TextField
                      label={t('contacts_popup.email')}
                      name="email"
                      type="email"
                      placeholder={t('contacts_popup.email_placeholder')}
                    />
                  </>
                }

                <TextAreaField
                  label={t('contacts_popup.message')}
                  name="message"
                  placeholder={t('contacts_popup.message_placeholder')}
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

export default ContactsPopup;