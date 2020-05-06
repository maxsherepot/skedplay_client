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
import { Link } from 'lib/i18n'
import { ArrowBack } from "UI";
import EditEmployeeHeader from "components/employee/EditEmployeeHeader";

const AccountAdEdit = ({user}) => {
  const {t, i18n} = useTranslation();

  const employeeId = user.employee.id;

  const { data: { employee } = {}, loading, refetch} = useQuery(GET_EMPLOYEE, {
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
        <EditEmployeeHeader
          user={user}
          employee={employee}
          refetchEmployee={refetch}
          classes="flex items-center flex-wrap w-full md:w-6/12 justify-center xl:flex-no-wrap xl:justify-between border border-divider p-3 mx-8 mt-6 rounded-lg"
        />

        <EditEmployeeBox employee={employee} refetchEmployee={refetch} />
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
