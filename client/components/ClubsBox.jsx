import React from "react";
import PropTypes from "prop-types";

import { useQuery } from "@apollo/react-hooks";
import { usePagination } from "hooks";
import { ALL_CLUBS } from "queries/clubQuery";
import { MapSvg } from "icons";
import { ClubCard, Pagination, Sort, Button, Loader } from "UI";

function ClubsBox({ entities: clubs, loading, networkStatus, error, page, setPage, sortComponent }) {
  if (loading || networkStatus === 4) return <Loader/>;
  if (error) return <div>{error.message}</div>;
  if (!clubs) return <div>-----</div>;

  return (
    <>
      <div className="fluid-container flex justify-between my-6">
        <div>
          {clubs && clubs.paginatorInfo ? clubs.paginatorInfo.total : 0}
          <span className="ml-1">clubs found</span>
        </div>
        {sortComponent}
      </div>

      <div className="fluid-container">
        {clubs && clubs.data && !loading ? (
          <>
            <div className="flex flex-wrap -mx-3">
              {clubs.data &&
                clubs.data.map(club => (
                  <ClubCard key={club.id} {...club} />
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
        {...clubs.paginatorInfo}
      />
    </>
  );
}

ClubsBox.propTypes = {
  // inititalState: PropTypes.object.isRequired
};

export default ClubsBox;
