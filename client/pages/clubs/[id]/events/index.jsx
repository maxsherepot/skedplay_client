import { useRouter } from "next/router";
import { Gallery, EventCard } from "UI";
import { GET_CLUB } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { ClubBox } from "components/club";
import checkLoggedIn from "lib/checkLoggedIn";

const Information = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { club } = {}, loading } = useQuery(GET_CLUB, {
    variables: {
      id
    }
  });

  if (loading) {
    return "Loading...";
  }

  const sidebarColumn = <Gallery photos={club.photos} height="597px" />;

  const contentColumn = (
    <>
      <div className="text-2xl font-extrabold my-5">Meine Events</div>

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
                ></EventCard>
              ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );

  return (
    <ClubBox club={club} user={loggedInUser}>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
        <div className="w-full lg:w-3/12 px-3">
          <div className="text-2xl font-extrabold my-5">Fotogalerie</div>
          {sidebarColumn}
        </div>
        <div className="w-full lg:w-9/12 px-3">{contentColumn}</div>
      </div>
    </ClubBox>
  );
};

Information.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default Information;
