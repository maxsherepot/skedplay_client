import React from "react";
import { useRouter } from "next/router";
import Link from 'components/SlashedLink'
import { useQuery } from "@apollo/react-hooks";
import { GET_CLUB, GET_EVENT } from "queries";
import { Button, Gallery, EventLabel, Loader } from "UI";
import { ClubBox } from "components/club";
import { ArrowNextSvg } from "icons";
import checkLoggedIn from "lib/checkLoggedIn";
import {useTranslation} from "react-i18next";
import slug from "slug";
import {NextSeo} from "next-seo";

const ClubEventShow = ({ user }) => {
  const router = useRouter();
  const { id, event: eventId, canton, city } = router.query;
  const {t, i18n} = useTranslation();

  const { data: { club } = {}, loading: clubLoading } = useQuery(GET_CLUB, {
    variables: {
      id
    }
  });

  const { data: { event } = {}, loading: eventLoading } = useQuery(GET_EVENT, {
    variables: {
      id: eventId
    }
  });

  if (clubLoading || eventLoading) {
    return <Loader/>;
  }

  if (!club || !event || parseInt(event.owner_id) !== parseInt(club.id)) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const canonical = `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}clubs/${canton}/${city}/${club.id}/events/${event.id}/`;

  const [photo] = event && event.photos;

  const sidebarColumn = <Gallery photos={club.photos} />;

  const contentColumn = (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <div className="flex items-end my-5">
          <div className="text-2xl font-extrabold tracking-tighter">
            {t('clubs.event_in', {name: club.name})}
          </div>
          <Link
            href={`/clubs/canton/city/id/events?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
            as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/events`}
          >
            <a className="block text-sm whitespace-no-wrap transition leading-loose hover:text-red ml-4">
              <ArrowNextSvg>
                <span className="mr-1">{t('clubs.all_club')}</span>
              </ArrowNextSvg>
            </a>
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <img
            className="rounded-t-lg w-full object-cover h-80"
            src={photo && photo.url || '/static/img/event-none.png'}
            alt=""
          />
          <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
            <div className="flex flex-wrap -mx-3">
              <div className="px-3">
                <Button
                  className="text-xs px-2 lg:px-4"
                  weight="normal"
                  size="xxs"
                >
                  {t('common.today')}
                </Button>
              </div>
              <div className="px-3">
                <EventLabel type={event.type} />
              </div>
            </div>
            <div className="text-2xl font-extrabold truncate my-5">
              {event.title}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-b-lg px-5 py-5">
          {event.description}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NextSeo
        title={event.title}
        canonical={canonical}
      />

      <ClubBox club={club} user={user}>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-2/5 px-3">
            <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
            {sidebarColumn}
          </div>
          <div className="w-full lg:w-3/5 px-3">{contentColumn}</div>
        </div>
      </ClubBox>
    </>
  );
};

ClubEventShow.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

ClubEventShow.getLayout = page => page;

export default ClubEventShow;
