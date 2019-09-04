import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { MapSvg, FavoriteSvg, CloseSvg } from "icons";
import { usePagination } from "hooks";
import { MainLayout } from "layouts";
import { Button, Filter, Pagination, Sort } from "UI";
import { ALL_EVENTS } from "queries/eventQuery";
import GoogleMap from "components/GoogleMap";

function Events({ loggedInUser }) {
  const [favoriteId, setFavoriteId] = useState(null);
  const [eventMapId, setEventMapId] = useState(null);
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
      <Sort>
        <div>
          {events && events.paginatorInfo ? events.paginatorInfo.total : 0}
          <span className="ml-1">event found</span>
        </div>
      </Sort>

      <div className="container">
        {events && events.data && !loading ? (
          <>
            <div className="flex flex-wrap -mx-2">
              {events.data &&
                events.data.map(({ id, title, club, photos }) => {
                  const [thumb] = photos;

                  const isMap = eventMapId === id;
                  const isFavorite = favoriteId === id;

                  return (
                    <div
                      className="relative overflow-hidden w-full md:w-1/2 lg:w-1/3 hd:w-1/4 mb-4 px-2 rounded-t-lg"
                      key={id}
                    >
                      <div
                        className="relative overflow-hidden rounded-t-lg"
                        style={{
                          backgroundImage: `url(${thumb.url})`,
                          backgroundSize: "cover",
                          height: 335
                        }}
                      >
                        {/* Extract to component */}
                        {isMap ? (
                          <div
                            className="absolute z-30 top-0 right-0 p-3-5"
                            onClick={() => setEventMapId(null)}
                          >
                            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10">
                              <CloseSvg></CloseSvg>
                            </button>
                          </div>
                        ) : (
                          <div
                            className="absolute z-20 top-0 right-0 p-3-5"
                            onClick={() =>
                              setFavoriteId(isFavorite ? null : id)
                            }
                          >
                            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10">
                              <FavoriteSvg active={isFavorite}></FavoriteSvg>
                            </button>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
                          {!isMap && (
                            <div>
                              <Button
                                className="text-xs px-2 lg:px-4"
                                weight="normal"
                                size="xxs"
                              >
                                TODAY
                              </Button>
                              <Button
                                className="text-xs px-2 lg:px-4 ml-3"
                                weight="normal"
                                size="xxs"
                              >
                                PARTIES AND SHOWS
                              </Button>
                            </div>
                          )}
                          <div>Ultra Party</div> {/* {title} */}
                        </div>
                      </div>
                      <div className="bg-white p-5">
                        <div className="flex items-center text-sm mb-2">
                          <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"></span>
                          Karlheinz Stockhausen, {id}
                        </div>
                        <div
                          className="flex justify-between text-xs cursor-pointer"
                          onClick={() => setEventMapId(id)}
                        >
                          <div>{club.address}</div>
                          <div className="flex">
                            <MapSvg></MapSvg>
                            <span className="ml-1">150 km</span>
                          </div>
                        </div>
                      </div>
                      {isMap && (
                        <div>
                          <GoogleMap className="absolute top-0 left-0 z-20 px-2"></GoogleMap>
                          <div className="absolute bottom-0 left-0 z-30 p-6">
                            <Button className="px-6" size="sm">
                              Get me to the club
                            </Button>
                          </div>
                        </div>
                      )}
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
        <div className="mt-5 bg-white w-full sm:w-2/3 lg:w-2/5 hd:w-1/5 p-4">
          <p className="font-bold">Badenersrasse 109, 8004 Zurich</p>
          <div className="flex my-4">
            <MapSvg></MapSvg>
            <span className="ml-3">12 km from me</span>
          </div>
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
