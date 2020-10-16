import React from "react";
import { ClubCard, Pagination, Sort, Loader } from "UI";
import {useTranslation} from "react-i18next";

function ClubsBox({ entities: clubs, loading, networkStatus, error, page, setPage, sortComponent }) {
  const {t, i18n} = useTranslation();

  if (loading || networkStatus === 4) return <Loader/>;
  if (error) return <div>{error.message}</div>;
  if (!clubs) return <div>-----</div>;

  return (
    <>
      <div className="container flex justify-between my-6">
        <div>
          {clubs && clubs.paginatorInfo ? clubs.paginatorInfo.total : 0}
          <span className="ml-1">{t('clubs.found')}</span>
        </div>
        {sortComponent}
      </div>

      <div className="container">
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
