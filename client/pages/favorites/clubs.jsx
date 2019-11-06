import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_CLUBS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { ClubCard } from "UI";
import { FavoriteBox } from "components/favorite";

const FavoriteClubs = ({ user }) => {
  const { data: { favoriteClubs } = {}, loading } = useQuery(FAVORITE_CLUBS, {
    variables: {
      id: user.id
    }
  });

  if (loading) {
    return "Loading...";
  }

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-extrabold my-5">Favorite Clubs</div>

      <div className="flex flex-wrap -mx-3">
        {favoriteClubs &&
          favoriteClubs.map(club => <ClubCard key={club.id} {...club} />)}
      </div>

      {favoriteClubs && favoriteClubs.length === 0 && (
        <div>
          <div className="font-bold mb-4">No favorite clubs found!</div>
          <div className="italic">
            You have no favorite clubs yet. Tap the heart on the club's card to
            add one.
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
