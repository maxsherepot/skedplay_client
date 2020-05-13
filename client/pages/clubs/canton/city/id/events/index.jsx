import React from "react";
import { useRouter } from "next/router";
import { Gallery, EventCard, Loader } from "UI";
import { GET_CLUB } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { ClubBox } from "components/club";
import checkLoggedIn from "lib/checkLoggedIn";
import {useTranslation} from "react-i18next";
import slug from "slug";
import {Link} from "lib/i18n";
import {NextSeo} from "next-seo";

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
    return <Loader/>;
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
                  href={`/clubs/canton/city/id/events`}
                  as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/events`}
                  linkQueryParams={`?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
                  key={event.id}
                  {...event}
                />
              ))}
          </div>
        </>
      ) : (
        <div><Loader/></div>
      )}
    </>
  );

  return (
    <>
      <NextSeo
        title={club.name + ' ' + t('common.events').toLowerCase()}
      />

      <ClubBox club={club} user={user}>
        <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
          <div className="w-full lg:w-3/12 px-3">
            <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
            {sidebarColumn}
          </div>
          <div className="w-full lg:w-9/12 px-3">{contentColumn}</div>
        </div>
      </ClubBox>
    </>
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
