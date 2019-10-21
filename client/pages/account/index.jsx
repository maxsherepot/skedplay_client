import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import { getLayout } from 'components/account/AccountLayout'
import { PrivateCards, ClubOwnerBox } from "components/account";

const cardRow = (user) => {
  if (user.is_employee) {
    return <PrivateCards user={user} />;
  }

  if (user.is_club_owner) {
    return <ClubOwnerBox user={user} />;
  }
};

const AccountShow = ({ user }) => (cardRow(user));

AccountShow.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

AccountShow.getLayout = getLayout;

export default AccountShow;
