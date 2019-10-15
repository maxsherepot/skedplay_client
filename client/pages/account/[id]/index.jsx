import React, { useState } from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { AccountBox } from "components/account";
import { PrivateCards, ClubOwnerCards } from "components/account";

const cardRow = (user, collapse) => {
  if (user.is_employee) {
    return <PrivateCards collapse={collapse} user={user} />;
  }

  if (user.is_club_owner) {
    return <ClubOwnerCards collapse={collapse} user={user} />;
  }
};

const AccountShow = ({ loggedInUser }) => {
  const [collapse, setCollapse] = useState(0);

  return <AccountBox user={loggedInUser} collapse={collapse} setCollapse={setCollapse}>{cardRow(loggedInUser, collapse)}</AccountBox>;
};

AccountShow.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default AccountShow;
