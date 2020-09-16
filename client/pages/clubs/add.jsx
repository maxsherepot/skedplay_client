import React from "react";
import { useRouter } from "next/router";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import { NewClubBox } from "components/club";
import { CloseSvg } from "icons";
import { PageCard } from "UI";
import {useTranslation} from "react-i18next";
import Link from 'components/SlashedLink'
import ArrowBack from "UI/ArrowBack";

const ClubsAdd = ({ user }) => {
  const router = useRouter();
  const {t, i18n} = useTranslation();

  const Breadcrumbs = () => (
      <div className="container">
        <div className="flex items-center py-4">
          <ArrowBack back />
          <div className="ml-10 hidden sm:block">
            <Link href="/account">
                <a className="text-red hover:text-pink">{t('favorite.clubs')}</a>
            </Link>
              <span className="px-2 text-grey">/</span>
              {t('common.add_new')}
          </div>
        </div>
      </div>
  );

  return (
    <>
      <div className="container">
        <Breadcrumbs />
          <div className="flex flex-col md:flex-row items-center justify-between hd:w-7/12 mx-auto pt-4 pb-8">
            <div className="text-4-65xl font-extrabold">{t('clubs.add_club')}</div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.back()}
            >
              <CloseSvg width={18} height={18} />
              <div className="ml-2">{t('clubs.close')}</div>
            </div>
            </div>
            <PageCard>
              <NewClubBox />
            </PageCard>
      </div>
    </>
  );
};

ClubsAdd.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

export default ClubsAdd;
