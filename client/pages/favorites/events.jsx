import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_EVENTS, ALL_EVENTS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { EventCard, Loader } from "UI";
import { FavoriteBox } from "components/favorite";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";

const FavoriteEvents = ({ user }) => {
  const {t, i18n} = useTranslation();

  const loadFromCookies = true; // !user

  let favoritesIdsJson = Cookies.get('favorite_event') || '[]';
  let favoritesIds = JSON.parse(favoritesIdsJson);

  const { data = {}, loading } = useQuery(
    !loadFromCookies ? FAVORITE_EVENTS : ALL_EVENTS,
    {
    variables: !loadFromCookies ? {
      id: user.id
    } : {
      first: 100,
      page: 1,
      filters: {
        ids: favoritesIds
      }
    }
  });

  if (loading) {
    return <Loader/>;
  }

  const favoriteEvents = !loadFromCookies ? data.favoriteEvents : data.events.data;

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-extrabold my-5">{t('favorites.page_events')}</div>

      <div className="flex flex-wrap -mx-3">
        {favoriteEvents &&
          favoriteEvents.map(event => (
            <EventCard
              className="w-full md:w-1/2 lg:w-1/3 hd:w-1/4"
              key={event.id}
              {...event}
            />
          ))}
      </div>

      {favoriteEvents && favoriteEvents.length === 0 && (
        <div>
          <div className="font-bold mb-4">{t('favorites.not_events')}</div>
          <div className="italic">
            {t('favorites.add_events')}
          </div>
        </div>
      )}
    </FavoriteBox>
  );
};

FavoriteEvents.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

FavoriteEvents.getLayout = page => page;

export default FavoriteEvents;
