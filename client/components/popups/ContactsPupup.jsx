import {Popup} from 'UI';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik, useFormikContext} from "formik";
import React, {useState} from "react";
import { CONTACT_PHONES, CREATE_CONTACT_REQUEST } from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Loader, TextField, TextAreaField, Button} from 'UI';

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

const ContactsPopup =  ({trigger, title}) => {
  const { t, i18n } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);

  const defaultTrigger = (
    <li className="mx-8 cursor-pointer">
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

    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 10000);
  };

  return (
    <Popup
      trigger={trigger || defaultTrigger}
      title={title || defaultTitle}
      contentStyle={{
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <div className="text-left mb-5">
        <Formik
          initialValues={{
            theme: '',
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={Yup.object().shape({
            theme: Yup.string().required(),
            name: Yup.string().required(),
            email: Yup.string().required(),
            message: Yup.string().required(),
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

                <TextAreaField
                  label={t('contacts_popup.message')}
                  name="message"
                  placeholder={t('contacts_popup.message_placeholder')}
                  textLength={3000}
                  rows={4}
                />

                {showSuccess &&
                  <div className="text-xl font-bold text-center">
                    {t('contacts_popup.success')}
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

      <Phones/>
    </Popup>
  );
};

export default ContactsPopup;