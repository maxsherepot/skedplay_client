import PropTypes from "prop-types";

import { useQuery } from "@apollo/react-hooks";

import { usePagination } from "hooks";
import { ALL_EVENTS } from "queries/eventQuery";
import { MapSvg } from "icons";
import { EventCard, Pagination, Sort, Button, AddressCard } from "UI";

function EventsBox({ inititalState }) {
  const [page, setPage] = usePagination();

  let filters = [];

  Object.keys(inititalState).map(key => {
    if (inititalState[key] === "") return;

    if (inititalState[key] === null) {
      return (filters[key] = "");
    }

    filters[key] = inititalState[key];
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

      <div className="fluid-container">
        {events && events.data && !loading ? (
          <>
            <div className="flex flex-wrap -mx-3">
              {events.data &&
                events.data.map(event => (
                  <EventCard
                    className="w-full md:w-1/2 lg:w-1/3 hd:w-1/4"
                    key={event.id}
                    {...event}
                  ></EventCard>
                ))}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="fluid-container">
        <AddressCard className="w-full sm:w-2/3 lg:w-2/5 hd:w-1/5" />
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
