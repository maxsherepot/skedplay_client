import checkLoggedIn from "lib/checkLoggedIn";

import { FAVORITE_EVENTS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { EventCard } from "UI";
import { FavoriteBox } from "components/favorite";

const FavoriteEvents = ({ user }) => {
  const { data: { favoriteEvents } = {}, loading } = useQuery(FAVORITE_EVENTS, {
    variables: {
      id: user.id
    }
  });

  if (loading) {
    return "Loading...";
  }

  return (
    <FavoriteBox user={user}>
      <div className="text-2xl font-extrabold my-5">Favorite Events</div>

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
          <div className="font-bold mb-4">No favorite events found!</div>
          <div className="italic">
            You have no favorite events yet. Tap the heart on the event's card
            to add one.
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
