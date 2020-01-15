import React from "react";
import { useRouter } from "next/router";
import { GET_CLUB } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { GirlCard } from "UI";
import { ClubBox } from "components/club";
import checkLoggedIn from "lib/checkLoggedIn";
import {useTranslation} from "react-i18next";

const ClubGirls = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;
  const {t, i18n} = useTranslation();

  const { data: { club } = {}, loading } = useQuery(GET_CLUB, {
    variables: {
      id
    }
  });

  if (loading) {
    return t('common.loading');
  }

  return (
    <ClubBox club={club} user={user}>
      <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-3">
        {club.employees &&
          club.employees.map(girl => (
            <div
              className="sm:w-1/2 md:w-1/3 xl:w-1/4 hd:w-1/5 px-3"
              key={girl.id}
            >
              <GirlCard girl={girl} />
            </div>
          ))}
      </div>
    </ClubBox>
  );
};

ClubGirls.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

ClubGirls.getLayout = page => page;

export default ClubGirls;
