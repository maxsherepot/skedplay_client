import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { AccountBox } from "components/account";
import { PrivateCards, ClubOwnerCards } from "components/account";

const cardRow = user => {
  if (user.is_employee) {
    return <PrivateCards user={user} />;
  }

  if (user.is_club_owner) {
    return <ClubOwnerCards user={user} />;
  }
};

const AccountShow = ({ loggedInUser }) => {
  return <AccountBox user={loggedInUser}>{cardRow(loggedInUser)}</AccountBox>;
};

AccountShow.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default AccountShow;
