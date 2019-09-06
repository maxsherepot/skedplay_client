import PropTypes from "prop-types";

import { useQuery } from "@apollo/react-hooks";

import { usePagination } from "hooks";
import { ALL_EVENTS } from "queries/eventQuery";
import { MapSvg } from "icons";
import { EventCard, Pagination, Sort, Button } from "UI";

function EventsBox({ inititalState }) {
  const [page, setPage] = usePagination();

  let filters = [];

  Object.keys(inititalState).map(key => {
    if (inititalState[key] !== "") {
      filters[key] = inititalState[key];
    }
    return undefined;
  });

  const {
    data: { events },
    loading,
    error
  } = useQuery(ALL_EVENTS, {
    variables: {
      first: 8,
      page
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
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
                events.data.map(event => (
                  <EventCard key={event.id} {...event}></EventCard>
                ))}
            </div>
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

      <Pagination
        page={page}
        setPage={setPage}
        {...events.paginatorInfo}
      ></Pagination>
    </>
  );
}

EventsBox.propTypes = {
  inititalState: PropTypes.object.isRequired
};

export default EventsBox;
