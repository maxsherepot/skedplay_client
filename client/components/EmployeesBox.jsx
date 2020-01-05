import PropTypes from "prop-types";

import { usePagination } from "hooks";
import { ALL_EMPLOYEES } from "queries";
import { GirlCard, Pagination, Sort } from "UI";
import React from "react";

function EmployeesBox({ sortComponent, employees, loading, error, page, setPage, networkStatus }) {

  if (loading || networkStatus === 4) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!employees) return <div>-----</div>;

  return (
    <>
      <div className="fluid-container flex justify-between my-6">
        <div>
          {employees && employees.paginatorInfo
            ? employees.paginatorInfo.total
            : 0}
          <span className="ml-1">adverts found</span>
        </div>
        {sortComponent}
      </div>

      <div className="fluid-container">
        <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-2">
          {employees &&
            employees.data.map(girl => (
              <div
                className="sm:w-1/2 md:w-1/3 xl:w-1/4 hd:w-1/5 px-2"
                key={girl.id}
              >
                <GirlCard girl={girl} href="/employee" />
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
  // inititalState: PropTypes.object.isRequired
};

export default EmployeesBox;
