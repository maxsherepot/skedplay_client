import React from "react";
import redirect from "lib/redirect";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import StepBox from "components/StepBox";
import { EditEmployeeBox } from "components/employee";
import {
  GET_EMPLOYEE,
} from "queries";
import { useQuery } from "@apollo/react-hooks";
import { getLayout } from "components/account/AccountLayout";
import {useTranslation} from "react-i18next";
import { Loader } from "UI";
import Link from "next/link";
import { ArrowBack } from "UI";

const AccountAdEdit = ({user}) => {
  const {t, i18n} = useTranslation();

  const employeeId = user.employee.id;

  const { data: { employee } = {}, loading} = useQuery(GET_EMPLOYEE, {
    variables: {
      id: employeeId
    }
  });

  const Breadcrumbs = () => (
    <div className="fluid-container">
      <div className="flex items-center py-4">
        <ArrowBack back />
        <div className="ml-10">
          <Link href="/account">
            <a className="text-red hover:text-pink">{t('account.my_account')}</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          {t('account.my_card')}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="fluid-container">
      <Breadcrumbs/>

      <div className="bg-white shadow rounded-lg p-8">
        <EditEmployeeBox employee={employee} />
      </div>
    </div>
  );
};

// AccountAdEdit.getLayout = getLayout;

AccountAdEdit.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  if (!user.employee) {
    redirect(ctx, "/girls/add");
  }

  return {
    user,
    className: "lg:w-3/5 py-12"
  };
};

export default AccountAdEdit;
