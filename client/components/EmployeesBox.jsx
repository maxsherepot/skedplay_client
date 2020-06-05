import PropTypes from "prop-types";

import { usePagination } from "hooks";
import { ALL_EMPLOYEES } from "queries";
import { GirlCard, Pagination, Sort, Loader } from "UI";
import React from "react";
import MapWithMarkers from "components/maps/MapWithMarkers";
import {useTranslation} from "react-i18next";

function EmployeesBox({ sortComponent, employees, loading, error, page, setPage, networkStatus }) {
  const {t, i18n} = useTranslation();

  if (loading || networkStatus === 4) return <Loader/>;
  if (error) return <div>{error.message}</div>;
  if (!employees) return <div>-----</div>;

  const employeesWithCoordinates = employees.data.filter(e => e.lat !== null && e.lng !== null);

  return (
    <>
      <div className="container flex justify-between my-6">
        <div>
          {employees && employees.paginatorInfo
            ? employees.paginatorInfo.total
            : 0}
          <span className="ml-1">{t('employees.adverts_found')}</span>
        </div>
        {sortComponent}
      </div>

      {/*<div className="container">*/}
      {/*  <MapWithMarkers*/}
      {/*    markers={employeesWithCoordinates}*/}
      {/*    mapContainerStyle={{width: '100%', height: '400px'}}*/}
      {/*    showLabel={true}*/}
      {/*  ></MapWithMarkers>*/}
      {/*</div>*/}

      <div className="container">
        <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-4">
          {employees &&
            employees.data.map(girl => (
              <div
                className="flex justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 1hd:w-1/5 md:px-2 sm:px-0"
                key={girl.id}
              >
                <GirlCard girl={girl} href="/employee" previewClass="w-full"/>
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
