import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";

import { usePagination } from "hooks";
import { ALL_EVENTS } from "queries/eventQuery";
import { EventCard, Pagination, Sort, AddressCard, Loader } from "UI";
import React from "react";

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

  const { data: { events } = {}, loading, error } = useQuery(ALL_EVENTS, {
    variables: {
      first: 8,
      page
    }
  });

  if (loading) return <Loader/>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="fluid-container flex justify-between my-6">
        <div>
          {events && events.paginatorInfo ? events.paginatorInfo.total : 0}
          <span className="ml-1">event found</span>
        </div>
      </div>

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
                  />
                ))}
            </div>
          </>
        ) : (
          <div><Loader/></div>
        )}
      </div>

      <div className="fluid-container">
        <AddressCard className="w-full sm:w-2/3 lg:w-2/5 hd:w-1/5" />
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        {...events.paginatorInfo}
      />
    </>
  );
}

EventsBox.propTypes = {
  inititalState: PropTypes.object.isRequired
};

export default EventsBox;
