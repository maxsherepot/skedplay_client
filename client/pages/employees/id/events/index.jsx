import {usePagination} from "hooks";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {EVENTS_BY_OWNER, GET_EMPLOYEE, ALL_EMPLOYEES} from "queries";
import EmployeeBox from "components/employee/EmployeeBox";
import {EventCard, Gallery, Pagination, AddressCard, Loader} from "UI";
import {useTranslation} from "react-i18next";
import React from "react";

import {NextSeo} from "next-seo";


const EmployeeEvents = ({user}) => {
  const router = useRouter();
  const {id} = router.query;
  const [page, setPage] = usePagination();
  const {t, i18n} = useTranslation();

  const {data: {employee} = {}, loading: employeeLoading} = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  const { data: employeesData, loading: loadingEmployees, error } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 8,
      page: 1
    }
  });

  if (employeeLoading || loadingEmployees) {
    return <Loader/>;
  }

  const girlType = parseInt(employee.type) === 1
    ? 'girls'
    : 'trans';

  const employees = employeesData.employees.data || [];

  if (!employees) {
    return <Loader/>;
  }

  if (employee.user_status === 2 || employee.status === 2) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const sidebarColumn = (
    <>
      <Gallery photos={employee.photos}/>
      <AddressCard addressable={employee}/>
    </>
  );

  const contentColumn = (
    <>
      <div className="text-2xl font-extrabold my-5">{t('employees.meine_events')}</div>

      {employee.events && employee.events.length ? (
        <>
          <div className="flex flex-wrap -mx-3">
            {employee.events.map(event => (
              <EventCard
                className="w-full md:w-1/2 lg:w-1/3"
                key={event.id}
                href={`/${girlType}/canton/city/id/events`}
                linkQueryParams={`?id=${employee.id}&canton=${employee.city.canton.slug}&city=${employee.city.slug}`}
                as={`/${girlType}/${employee.city.canton.slug}/${employee.city.slug}/${employee.id}/events`}

                {...event}
              />
            ))}
          </div>

          {/*<Pagination*/}
          {/*  page={page}*/}
          {/*  setPage={setPage}*/}
          {/*  {...events.paginatorInfo}*/}
          {/*/>*/}
        </>
      ) : (
        <div></div>
      )}
    </>
  );

  const lastBreadcrumbs = [
    {
      label: t('employees.events'),
    }
  ];

  return (
    <>
      <NextSeo
        title={employee.name + ' ' + t('employees.events').toLowerCase()}
      />

      <EmployeeBox employee={employee} user={user} employees={employees} lastBreadcrumbs={lastBreadcrumbs}>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-3/12 px-3">
            <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
            {sidebarColumn}
          </div>
          <div className="w-full lg:w-9/12 px-3">{contentColumn}</div>
        </div>
      </EmployeeBox>
    </>
  );
};

EmployeeEvents.getInitialProps = async ctx => {
  const {loggedInUser} = await checkLoggedIn(ctx.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return {loggedInUser};
};

EmployeeEvents.getLayout = (page) => page;

export default EmployeeEvents;
