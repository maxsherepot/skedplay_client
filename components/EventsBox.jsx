import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";

import { usePagination } from "hooks";
import { ALL_EVENTS } from "queries/eventQuery";
import { EventCard, Pagination, Sort, AddressCard, Loader } from "UI";
import React from "react";
import {useTranslation} from "react-i18next";

function EventsBox({ entities: events, loading, networkStatus, error, page, setPage, sortComponent }) {
  const {t, i18n} = useTranslation();

  if (loading || networkStatus === 4) return <Loader/>;
  if (error) return <div>{error.message}</div>;
  if (!events) return <div>-----</div>;

  return (
    <>
      <div className="container flex justify-between my-6">
        <div>
          {events && events.paginatorInfo ? events.paginatorInfo.total : 0}
          <span className="ml-1">{t('employees.event_found')}</span>
        </div>
        {sortComponent}
      </div>

      <div className="container">
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

      <Pagination
        page={page}
        setPage={setPage}
        {...events.paginatorInfo}
      />
    </>
  );
}

EventsBox.propTypes = {
  // inititalState: PropTypes.object.isRequired
};

export default EventsBox;
