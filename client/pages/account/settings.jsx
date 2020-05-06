import React from "react";
import { Link } from 'lib/i18n'
import { ArrowBack } from "UI";
import redirect from "lib/redirect";
import {UPDATE_USER} from "queries";
import checkLoggedIn from "lib/checkLoggedIn";
import { EditAccount } from "components/account";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import { getLayout } from "components/account/AccountLayout";
import Loader from "UI/Loader";
import {GET_EMPLOYEE} from "queries/employeeQuery";

const AccountSettings = ({ user }) => {
  const [onSubmit] = useMutation(UPDATE_USER);
  const {t, i18n} = useTranslation();

  const employeeId = user && user.employee ? user.employee.id : null;
  const { data: { employee } = {}, loading} = useQuery(GET_EMPLOYEE, {
    variables: {
      id: employeeId
    }
  });

  if (loading) {
    return <Loader/>
  }

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
      <div className="fluid-container">
        {user.employee ? (
            <div className="">
              <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
                {t('account.contact_information')}
              </div>
              <p className="italic mb-5 mx-3">
                {t('account.change_info_by_contact_form')}
              </p>
              <div>
                <p className="p-2">Phone: {employee.phone}</p>
                <p className="p-2">Email: {employee.email}</p>
                <p className="p-2">Gender: {employee.gender === 1 ? 'Male' : 'Female'}</p>
                <p className="p-2">Birthday: {employee.birthday}</p>
              </div>
            </div>
        ) : (
            <div className="">
              <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
                {t('account.contact_information')}
              </div>
              <p className="italic mb-5 mx-3">
                {t('account.for_administration')}
              </p>
              <EditAccount initialValues={user} onSubmit={onSubmit} />
            </div>
        )}
      </div>
    </>
  );
};

AccountSettings.getLayout = getLayout;

AccountSettings.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }
  return { user };
};

export default AccountSettings;
