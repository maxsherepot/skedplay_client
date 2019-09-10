import PropTypes from "prop-types";

import { useQuery } from "@apollo/react-hooks";
import { usePagination } from "hooks";
import { ALL_CLUBS } from "queries/clubQuery";
import { MapSvg } from "icons";
import { ClubCard, Pagination, Sort, Button } from "UI";

function ClubsBox({ inititalState }) {
  const [page, setPage] = usePagination();

  const filters = [];

  Object.keys(inititalState).map(key => {
    if (inititalState[key] === "") return;

    if (inititalState[key] === null) {
      return (filters[key] = "");
    }

    filters[key] = inititalState[key];
  });

  const {
    data: { clubs },
    loading,
    error
  } = useQuery(ALL_CLUBS, {
    variables: {
      first: 8,
      page,
      filters: {
        ...filters
      }
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Sort>
        <div>
          {clubs && clubs.paginatorInfo ? clubs.paginatorInfo.total : 0}
          <span className="ml-1">clubs found</span>
        </div>
      </Sort>
      <div className="fluid-container">
        {clubs && clubs.data && !loading ? (
          <>
            <div className="flex flex-wrap -mx-3">
              {clubs.data &&
                clubs.data.map(club => (
                  <ClubCard key={club.id} {...club}></ClubCard>
                ))}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="fluid-container">
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
        {...clubs.paginatorInfo}
      ></Pagination>
    </>
  );
}

ClubsBox.propTypes = {
  inititalState: PropTypes.object.isRequired
};

export default ClubsBox;
