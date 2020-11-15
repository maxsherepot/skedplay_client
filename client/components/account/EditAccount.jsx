import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, TextField, PhoneField } from "UI";
import { getErrors } from "utils";
import { useTranslation } from "react-i18next";
import Popup from "reactjs-popup";
import Content from "UI/Popup/Content";
import {CloseSvg } from "icons";



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
          <div className="px-2">
            {status && (
              <div className="text-dark-green text-white px-1 mb-3">
                {status}
              </div>
            )}
            <TextField className="w-1/3" label={t('account.user_name')} name="name" />
            <TextField className="w-1/3" label={t('account.contact_email')} name="email" />
            <PhoneField
              className="w-1/3"
              label={t('account.contact_phone_number')}
              name="phone"
            />

            <Button
              type="submit"
              className="px-8"
              size="sm"
              disabled={isSubmitting}
            >
              {t('account.save_changes')}
            </Button>




            <Popup
              modal
              closeOnDocumentClick
              onClose={closeModal}
              open={showModal}
              contentStyle={{
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <Content
                title={"Account delete"}
                //close={closeModal}
              >
                <div 
                className="absolute top-0 right-0 m-4 cursor-pointer" 
                onClick={closeModal}>
                  <CloseSvg />
                </div>

                <h3 className="mt-3">Do you really want to delete your account?</h3>
              </Content>
            </Popup>


            <span
              className="text-xl text-grey font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer"
              onClick={showModal}
            >delete profile</span>




          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditAccount;
