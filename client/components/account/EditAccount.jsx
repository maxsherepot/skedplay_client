import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, TextField, PhoneField } from "UI";
import { getErrors } from "utils";
import { useTranslation } from "react-i18next";
import Popup from "reactjs-popup";
import Content from "UI/Popup/Content";


const contentStyle = {
  background: "transparent",
  width: 400,
  padding: 0,
  border: "none",
};


const EditAccount = ({ initialValues, onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [banPopupShow, setBanPopupShow] = useState(false);

  const handleSubmits = async (
    { name, email, phone },
    { setSubmitting, setErrors, setError, setStatus }
  ) => {
    try {
      const { data: { updateUser } = {} } = await onSubmit({
        variables: {
          user: initialValues.id,
          input: {
            name,
            email,
            phone
          }
        }
      });

      if (updateUser && updateUser.status) {
        setStatus(updateUser.message);
      } else {
        setError(updateUser.message);
      }
    } catch (e) {
      if (getErrors(e) instanceof Object) {
        setErrors(getErrors(e));
      }
    }

    setSubmitting(false);
  };

  const showModal = () => {
    setBanPopupShow(true);
  }

  const closeModal = () => {
    setBanPopupShow(false);
    // client.clearStore().then(() => redirect({}, "/"));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        phone: Yup.string().required()
      })}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-0 sm:px-2">
            {status && (
              <div className="text-dark-green text-white px-1 mb-3">
                {status}
              </div>
            )}
            <TextField className="sm:w-1/3" label={t('account.user_name')} name="name" />
            <TextField className="sm:w-1/3" label={t('account.contact_email')} name="email" />
            <PhoneField className="sm:w-1/3" label={t('account.contact_phone_number')} name="phone" />

            <Popup
              modal
              closeOnDocumentClick
              onClose={closeModal}
              open={banPopupShow}
              contentStyle={contentStyle}
            >
              <Content
                title={t('account.delete_account')}
                close={closeModal}
              >
                <h3 className="mt-3">{t('account.really_delete_account')}</h3>
                <Button
                  type="button"
                  onClick={() => console.log("Delete account action")}
                  className="px-3 mr-4 mt-8"
                  level="primary"
                  size="xs" >
                  {t('answer.yes_delete')}
                </Button>
              </Content>
            </Popup>

            <div className="" >
              <Button
                type="submit"
                className="px-8"
                size="sm"
                disabled={isSubmitting}
              >
                {t('account.save_changes')}
              </Button>

              <button
                type="button"
                className="mt-4 md:mt-0 md:ml-8 text-md text-grey font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer"
                onClick={showModal}
              > {t('account.delete_account')}</button>
            </div>









          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditAccount;
