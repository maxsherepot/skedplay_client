import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_EMPLOYEES, ALL_EMPLOYEES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { GirlCard, Loader } from "UI";
import { FavoriteBox } from "components/favorite";
import {useTranslation} from "react-i18next";
import Cookies from 'js-cookie'

const FavoriteGirls = ({ user }) => {
  const {t, i18n} = useTranslation();

  const loadFromCookies = true; // !user

  let favoritesIdsJson = Cookies.get('favorite_employee') || '[]';
  let favoritesIds = JSON.parse(favoritesIdsJson);

  const { data = {}, loading } = useQuery(
    !loadFromCookies ? FAVORITE_EMPLOYEES : ALL_EMPLOYEES,
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
    }
  );

  if (loading) {
    return <Loader/>;
  }

  const favoriteEmployees = !loadFromCookies ? data.favoriteEmployees : data.employees.data;

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-extrabold my-5">{t('favorites.page_girls')}</div>

      <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-4">
        {favoriteEmployees &&
          favoriteEmployees.map(girl => (
            <div
              className="flex justify-center sm:w-1/2 md:w-1/3 xl:w-1/4 hd:w-1/5 px-2"
              key={girl.id}
            >
              <GirlCard girl={girl} href="/employee" user={user} />
            </div>
        ))}
      </div>
      {favoriteEmployees && favoriteEmployees.length === 0 && (
        <div>
          <div className="font-bold mb-4">{t('favorites.not_girls')}</div>
          <div className="italic">
            {t('favorites.add_girls')}
          </div>
        </div>
      )}
    </FavoriteBox>
  );
};

FavoriteGirls.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

FavoriteGirls.getLayout = page => page;

export default FavoriteGirls;
