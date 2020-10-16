import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import { getLayout } from 'components/account/AccountLayout'
import { PrivateBox, ClubOwnerBox, ClientBox } from "components/account";
import {useTranslation} from "react-i18next";

const AccountShow = ({ user }) => {
  const {t, i18n} = useTranslation();

  let Box;

  if (user.is_employee) {
    Box = <PrivateBox user={user} key={user.id} />;
  } else if (user.is_club_owner) {
    Box = <ClubOwnerBox user={user} />;
  } else {
    Box = <ClientBox user={user}/>;
  }

  return (
    <>
      {user.status === 2 &&
        <div className="mb-5">
          <div className="text-2xl font-bold">
            {t('account.account_rejected')}
          </div>
          <div className="text-xl">
            {t('account.reason')}: {user.rejected_reason}
          </div>
        </div>
      }

      {Box}
    </>
  );
};

AccountShow.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

AccountShow.getLayout = getLayout;

export default AccountShow;
