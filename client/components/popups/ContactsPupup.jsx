import {Popup} from 'UI';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import Link from "next/link";
import {Formik} from "formik";
import React from "react";
import { CONTACT_PHONES } from "queries";
import {useQuery} from "@apollo/react-hooks";
import {Loader} from 'UI';

const Phones = () => {
  const { loading, data: { contactPhones } = {} } = useQuery(
    CONTACT_PHONES
  );

  if (loading) {
    return <Loader/>;
  }

  if (!contactPhones) {
    return '---';
  }

  return (
    <div className="flex flex-col text-black">
      {contactPhones.map(phone => {
        return (
          <div className="pb-1">
            {phone.phone}
          </div>
        )
      })}
    </div>
  );
};

const ContactsPopup =  ({trigger, title}) => {
  const { t, i18n } = useTranslation();

  const defaultTrigger = (
    <li className="mx-8 cursor-pointer">
      {t('layout.contacts')}
    </li>
  );

  const defaultTitle = (
    <h3 className="text-black">{t('common.contacts_popup.title')}</h3>
  );

  return (
    <Popup
      trigger={trigger || defaultTrigger}
      title={title || defaultTitle}
      contentStyle={{
        maxWidth: "300px",
      }}
    >
      <Formik
        initialValues={{
          theme: "",
          message: "",
          email: "",
        }}
        validationSchema={Yup.object().shape({
          theme: Yup.string().required(),
          message: Yup.string().required(),
          email: Yup.string().email().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          // try {
          //   await onSubmit({
          //     variables: {
          //       ...values
          //     }
          //   });
          // } catch (e) {
          //   if (getErrors(e) instanceof Object) {
          //     setErrors(getErrors(e));
          //   } else {
          //     setError(getErrors(e));
          //   }
          // }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {/*<TextField*/}
            {/*  label={t('cn')}*/}
            {/*  type="password"*/}
            {/*  name="password"*/}
            {/*  placeholder={t('login.password_placeholder')}*/}
            {/*/>*/}

            {/*{error && (*/}
            {/*  <FormGroup className="error text-center">*/}
            {/*    <span>{error}</span>*/}
            {/*  </FormGroup>*/}
            {/*)}*/}

            {/*<Button*/}
            {/*  className="text-xl min-w-full"*/}
            {/*  type="submit"*/}
            {/*  disabled={isSubmitting}*/}
            {/*>*/}
            {/*  {t('common.login')}*/}
            {/*</Button>*/}
          </form>
        )}
      </Formik>

      <Phones/>
    </Popup>
  );
};

export default ContactsPopup;