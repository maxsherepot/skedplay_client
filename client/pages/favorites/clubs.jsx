import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_CLUBS, ALL_CLUBS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { ClubCard } from "UI";
import { FavoriteBox } from "components/favorite";
import {useTranslation} from "react-i18next";
import {Loader} from "UI";
import Cookies from "js-cookie";


const FavoriteClubs = ({ user }) => {
  const {t, i18n} = useTranslation();

  const loadFromCookies = true; // !user

  let favoritesIdsJson = Cookies.get('favorite_club') || '[]';
  let favoritesIds = JSON.parse(favoritesIdsJson);

  const { data = {}, loading } = useQuery(
    !loadFromCookies ? FAVORITE_CLUBS : ALL_CLUBS,
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

  const favoriteClubs = !loadFromCookies ? data.favoriteClubs : data.clubs.data;

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-bold my-5">{t('favorites.page_clubs')}</div>

      <div className="flex flex-wrap -mx-3">
        {favoriteClubs &&
          favoriteClubs.map(club => <ClubCard key={club.id} {...club} />)}
      </div>

      {favoriteClubs && favoriteClubs.length === 0 && (
        <div>
          <div className="font-bold mb-4">{t('favorites.not_clubs')}</div>
          <div className="italic">
            {t('favorites.add_clubs')}
          </div>
        </div>
      )}
    </FavoriteBox>
  );
};

FavoriteClubs.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

FavoriteClubs.getLayout = page => page;

export default FavoriteClubs;
