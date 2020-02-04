import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_EMPLOYEES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { GirlCard, Loader } from "UI";
import { FavoriteBox } from "components/favorite";
import {useTranslation} from "react-i18next";


const FavoriteGirls = ({ user }) => {
  const {t, i18n} = useTranslation();

  const { data: { favoriteEmployees } = {}, loading } = useQuery(
    FAVORITE_EMPLOYEES,
    {
      variables: {
        id: user.id
      }
    }
  );

  if (loading) {
    return <Loader/>;
  }

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-extrabold my-5">{t('favorites.page_girls')}</div>

      {favoriteEmployees &&
        favoriteEmployees.map(girl => (
          <div
            className="sm:w-1/2 md:w-1/3 xl:w-1/4 hd:w-1/5 px-3"
            key={girl.id}
          >
            <GirlCard girl={girl} href="/employee" />
          </div>
        ))}

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
