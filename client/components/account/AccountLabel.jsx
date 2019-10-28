import React from "react";

const AccountLabel = ({ is_client, is_club_owner, is_employee }) => {
  let account_name = "";
  if (is_client) {
    account_name = "Visitor";
  }
  if (is_club_owner) {
    account_name = "Club owner";
  }
  if (is_employee) {
    account_name = "Private account";
  }

  return (
    <div className="bg-black text-white text-xs rounded-full px-3 py-1">
      {account_name}
    </div>
  );
};

export default AccountLabel;
