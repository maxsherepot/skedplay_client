import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";

import { usePagination } from "hooks";
import { ALL_EMPLOYEES } from "queries";
import { GirlCard, Pagination, Sort } from "UI";

function EmployeesBox({ inititalState = {} }) {
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
    loading,
    error,
    data: { employees }
  } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 10,
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
          {employees && employees.paginatorInfo
            ? employees.paginatorInfo.total
            : 0}
          <span className="ml-1">adverts found</span>
        </div>
      </Sort>

      <div className="fluid-container">
        <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-3">
          {employees &&
            employees.data.map(girl => (
              <div
                className="sm:w-1/2 md:w-1/3 xl:w-1/4 hd:w-1/5 px-3"
                key={girl.id}
              >
                <GirlCard girl={girl} />
              </div>
            ))}
        </div>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        {...employees.paginatorInfo}
      ></Pagination>
    </>
  );
}

EmployeesBox.propTypes = {
  inititalState: PropTypes.object.isRequired
};

export default EmployeesBox;
