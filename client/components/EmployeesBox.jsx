import { GirlCard, Pagination, Sort, Loader } from "UI";
import React from "react";
import {useTranslation} from "react-i18next";

function EmployeesBox({ sortComponent, employees, loading, error, page, setPage, networkStatus, user }) {
  const {t, i18n} = useTranslation();

  if (loading || networkStatus === 4) return <Loader/>;
  if (error) return <div>{error.message}</div>;
  if (!employees) return <div>-----</div>;

  return (
    <>
      <div className="container flex items-center text-sm sm:text-base justify-between mt-2 sm:mt-4">
        <div>
          {employees && employees.paginatorInfo
            ? employees.paginatorInfo.total
            : 0}
          <span className="ml-1">{t('employees.adverts_found')}</span>
        </div>
        {sortComponent}
      </div>

      <div className="container">
        <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-4">
          {employees &&
            employees.data.map(girl => (
              <div
                className="flex justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 1hd:w-1/5 md:px-2 sm:px-0"
                key={girl.id}
              >
                <GirlCard girl={girl} href="/employee" previewClass="w-full" user={user}/>
              </div>
            ))}
        </div>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        {...employees.paginatorInfo}
      />
    </>
  );
}

EmployeesBox.propTypes = {
  // inititalState: PropTypes.object.isRequired
};

export default EmployeesBox;
