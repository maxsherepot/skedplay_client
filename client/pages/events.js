import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { MapSvg } from "icons";
import { usePagination } from "hooks";
import { MainLayout } from "layouts";
import { Button, Filter, Pagination } from "UI";
import { ALL_EVENTS } from "queries/eventQuery";

function Events({ loggedInUser }) {
  const [page, setPage] = usePagination();

  const {
    data: { events },
    loading
  } = useQuery(ALL_EVENTS, {
    variables: {
      first: 8,
      page
    }
  });

  return (
    <MainLayout user={loggedInUser}>
      <Filter name="Events"></Filter>
      <div className="container flex justify-between my-6">
        <span>
          {events && events.paginatorInfo ? events.paginatorInfo.total : 0}{" "}
          event found
        </span>
        <span>First: the neareast</span>
      </div>

      <div className="container">
        {events && events.data && !loading ? (
          <>
            <div className="flex flex-wrap -mx-2">
              {events.data &&
                events.data.map(({ id, title, club, photos }) => {
                  const [thumb] = photos;

                  return (
                    <div className="w-1/4 mb-4 px-2 rounded-t-lg" key={id}>
                      <div
                        className="relative overflow-hidden rounded-t-lg"
                        style={{
                          backgroundImage: `url(${thumb.url})`,
                          backgroundSize: "cover",
                          height: 335
                        }}
                      >
                        <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white">
                          <div>
                            <Button
                              className="text-xs px-4"
                              weight="normal"
                              size="xxs"
                            >
                              TODAY
                            </Button>
                            <Button
                              className="text-xs px-4 ml-3"
                              weight="normal"
                              size="xxs"
                            >
                              PARTIES AND SHOWS
                            </Button>
                          </div>
                          <div>Ultra Party</div> {/* {title} */}
                        </div>
                      </div>
                      <div className="bg-white p-5">
                        <div className="flex items-center text-sm mb-2">
                          <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"></span>
                          Karlheinz Stockhausen, {id}
                        </div>
                        <div className="flex justify-between text-xs">
                          <div>{club.address}</div>
                          <div className="flex">
                            <MapSvg></MapSvg>
                            <span className="ml-1">150 km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              {...events.paginatorInfo}
            ></Pagination>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="container">
        <div className="text-2xl font-black">Meine Adresse</div>
        {/* add page-card? */}
        <div className="mt-5 bg-white w-1/5 p-4">
          <p className="font-bold">Badenersrasse 109, 8004 Zurich</p>
          <div className="flex my-4">
            <MapSvg></MapSvg>
            <span className="ml-3">12 km from me</span>
          </div>
          {/* Green */}
          <Button className="px-4" size="xxs" level="success" weight="normal">
            Available
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

Events.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default Events;
