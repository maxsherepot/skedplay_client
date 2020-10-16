import React from "react";
import { useRouter } from "next/router";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import StepBox from "components/StepBox";
import { NewAdBox } from "components/ad";
import { CloseSvg } from "icons";
import { PageCard } from "UI";
import {useTranslation} from "react-i18next";

const AddEmployee = ({clubId}) => {
  const router = useRouter();
  const {t, i18n} = useTranslation();

  const links = [
    t('account.card_information'),
    t('account.services_and_price'),
    t('account.photos_and_videos'),
    t('account.schedule_and_activation'),
    t('account.book_and_pay')
  ];

  return (
    <>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between hd:w-7/12 mx-auto py-8">
          <div className="text-4-65xl font-bold">{t('ad.new')}</div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.back()}
          >
            <CloseSvg width={18} height={18} />
            <div className="ml-2">{t('clubs.close')}</div>
          </div>
        </div>
      </div>
      <PageCard>
        <div className="flex flex-col lg:flex-row justify-between">
          <StepBox links={links} stepsKey={'create_employee'} />
        </div>
        <div className="border-b border-divider" />
        <NewAdBox clubId={clubId}/>
      </PageCard>
    </>
  );
};

AddEmployee.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

export default AddEmployee;
