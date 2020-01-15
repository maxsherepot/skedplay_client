import React from "react";
import { useRouter } from "next/router";
import { Gallery, EventCard } from "UI";
import { GET_CLUB } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { ClubBox } from "components/club";
import checkLoggedIn from "lib/checkLoggedIn";
import {useTranslation} from "react-i18next";

const ClubEventsIndex = ({ user }) => {
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

  const sidebarColumn = <Gallery photos={club.photos} height="597px" />;

  const contentColumn = (
    <>
      <div className="text-2xl font-extrabold my-5">{t('clubs.meine_events')}</div>

      {club.events && club.events ? (
        <>
          <div className="flex flex-wrap -mx-3">
            {club.events &&
              club.events.map(event => (
                <EventCard
                  className="w-full md:w-1/2 lg:w-1/3"
                  href={`/clubs/${id}/events`}
                  key={event.id}
                  {...event}
                />
              ))}
          </div>
        </>
      ) : (
        <div>{t('common.loading')}</div>
      )}
    </>
  );

  return (
    <ClubBox club={club} user={user}>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
        <div className="w-full lg:w-3/12 px-3">
          <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
          {sidebarColumn}
        </div>
        <div className="w-full lg:w-9/12 px-3">{contentColumn}</div>
      </div>
    </ClubBox>
  );
};

ClubEventsIndex.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

ClubEventsIndex.getLayout = page => page;

export default ClubEventsIndex;
