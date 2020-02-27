import React from "react";
import {useTranslation} from "react-i18next";

const AccountLabel = ({ is_client, is_club_owner, is_employee }) => {
  const {t, i18n} = useTranslation();

  let account_name = "";
  if (is_client) {
    account_name = t('account.label.visitor');
  }
  if (is_club_owner) {
    account_name = t('account.label.club_owner');
  }
  if (is_employee) {
    account_name = t('account.label.private_account');
  }

  return (
    <div className="bg-black text-white text-xs rounded-full px-3 py-1">
      {account_name}
    </div>
  );
};

export default AccountLabel;
