import React from "react";
import Link from "next/link";
import { ArrowBack } from "UI";
import redirect from "lib/redirect";
import { UPDATE_USER } from "queries";
import checkLoggedIn from "lib/checkLoggedIn";
import { EditAccount } from "components/account";
import { useMutation } from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";

const AccountSettings = ({ user }) => {
  const [onSubmit] = useMutation(UPDATE_USER);
  const {t, i18n} = useTranslation();

  const Breadcrumbs = () => (
    <div className="fluid-container">
      <div className="flex items-center py-4">
        <ArrowBack back />
        <div className="ml-10">
          <Link href="/account">
            <a className="text-red hover:text-pink">{t('account.my_account')}</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          {t('account.account_settings')}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumbs />
      <div className="fluid-container">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
            {t('account.contact_information')}
          </div>
          <p className="italic mb-5 mx-3">
            {t('account.for_administration')}
          </p>
          <EditAccount initialValues={user} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};

AccountSettings.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }
  return { user };
};

export default AccountSettings;
