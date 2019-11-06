import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_EMPLOYEES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { GirlCard } from "UI";
import { FavoriteBox } from "components/favorite";

const FavoriteGirls = ({ user }) => {
  const { data: { favoriteEmployees } = {}, loading } = useQuery(
    FAVORITE_EMPLOYEES,
    {
      variables: {
        id: user.id
      }
    }
  );

  if (loading) {
    return "Loading...";
  }

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-extrabold my-5">Favorite Girls</div>

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
          <div className="font-bold mb-4">No favorite girls found!</div>
          <div className="italic">
            You have no favorite girls yet. Tap the heart on the girl's card to
            add one.
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
