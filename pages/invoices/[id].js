import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import { AnimationBackground } from "UI";
import {useTranslation} from "react-i18next";


const InvoiceShow = ({ user }) => {
    const {t, i18n} = useTranslation();
    return (
    <>
      <AnimationBackground full />
      <div className="container mx-auto">
        <div className="flex items-center flex-col">{t('invoices.page')}</div>
      </div>
    </>
  );
};

InvoiceShow.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

export default InvoiceShow;
