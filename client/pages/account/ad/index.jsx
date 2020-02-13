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

const AccountAdEdit = ({user}) => {
  const {t, i18n} = useTranslation();

  const employeeId = user.employee.id;

  const { data: { employee } = {}, loading} = useQuery(GET_EMPLOYEE, {
    variables: {
      id: employeeId
    }
  });

  const links = [
    t('account.card_information'),
    t('account.services_and_price'),
    t('account.photos_and_videos'),
    t('account.schedule_and_activation')
  ];

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <StepBox links={links} />
      </div>
      <div className="border-b border-divider" />
      <EditEmployeeBox employee={employee} />
    </>
  );
};

AccountAdEdit.getLayout = getLayout;

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
