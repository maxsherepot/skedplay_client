import {Popup} from 'UI';
import {useTranslation} from "react-i18next";
import React, {useState} from "react";

const ContactsCallbackSuccessPopup = ({open, setOpen}) => {

  const { t, i18n } = useTranslation();

  const defaultTitle = (
    <h3 className="text-black">{t('contacts_popup.title')}</h3>
  );

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={() => setOpen(false)}
      title={defaultTitle}
      // contentStyle={{
      //   width: "100%",
      //   maxWidth: "600px",
      // }}
    >
      <h3 className="pt-5 text-black">{t('contacts_popup.success')}</h3>
    </Popup>
  );
};

export default ContactsCallbackSuccessPopup;