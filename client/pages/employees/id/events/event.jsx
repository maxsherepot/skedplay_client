import React from "react";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {GET_EMPLOYEE, GET_EVENT, ALL_EMPLOYEES} from "queries";
import {CloseSvg} from "icons";
import {Button, Gallery, AddressCard, EventLabel, Loader} from "UI";
import checkLoggedIn from "lib/checkLoggedIn";
import GoogleMap from "components/GoogleMap";
import EmployeeBox from "components/employee/EmployeeBox";
import {useTranslation} from "react-i18next";
import {NextSeo} from "next-seo";


const EmployeeEventShow = ({user}) => {
  const router = useRouter();
  const {id, event: eventId, canton, city} = router.query;
  const {t, i18n} = useTranslation();

  const {data: {employee} = {}, loading: employeeLoading} = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  const {data: {event} = {}, loading: eventLoading} = useQuery(GET_EVENT, {
    variables: {
      id: eventId
    }
  });

  const { data: employeesData, loading: loadingEmployees, error } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 8,
      page: 1
    }
  });

  if (employeeLoading || eventLoading || loadingEmployees) {
    return <Loader/>;
  }

  const employees = employeesData.employees.data || [];

  if (!employees) {
    return <Loader/>;
  }

  if (!employee || !event || parseInt(event.owner_id) !== parseInt(employee.id)) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const girlType = parseInt(employee.type) === 1
    ? 'girls'
    : 'trans';

  const canonical = `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}${girlType}/${canton}/${city}/${employee.id}/events/${event.id}/`;

  const [photo] = event && event.photos;

  const sidebarColumn = (
    <>
      <Gallery photos={employee.photos}/>
      <AddressCard addressable={employee} isAvailable={false}/>
    </>
  );

  const contentColumn = (
    <div className="flex flex-col lg:flex-row -mx-3">
      <div className="w-full lg:w-2/3 px-3">
        <div className="text-2xl font-extrabold my-5">{t('employees.with_me')}</div>
        <div className="relative">
          <img
            className="rounded-t-lg w-full object-cover h-80"
            src={photo ? photo.url : '/static/img/event-none.png'}
            alt=""
          />
          <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
            <div className="flex flex-wrap -mx-3">
              <div className="px-3">
                <Button
                  className="text-xs px-2 lg:px-4"
                  weight="normal"
                  size="xxs"
                >
                  {t('common.today')}
                </Button>
              </div>
              <div className="px-3">
                <EventLabel type={event.type}/>
              </div>
            </div>
            <a>{t('employees.ultra_party')}</a>
            {/* title */}
          </div>
        </div>

        <div className="bg-white rounded-b-lg px-5 py-5">
          {event.description}
        </div>
      </div>
      <div className="w-full lg:w-1/3 px-3">
        <div className="text-2xl font-extrabold my-5">{t('employees.event_adresse')}</div>

        <div className="relative w-full h-80 overflow-hidden">
          <GoogleMap className="absolute top-0 left-0 z-20"/>
          <div className="absolute z-30 top-0 right-0 p-3-5">
            <button
              className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
              <CloseSvg/>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 z-30 p-6">
            <Button className="px-6" size="sm">
              {t('employees.get_me')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const lastBreadcrumbs = [
    {
      href: `/${girlType}/canton/city/id/events?id=${employee.id}&canton=${employee.city.canton.slug}&city=${employee.city.slug}`,
      as: `/${girlType}/${employee.city.canton.slug}/${employee.city.slug}/${employee.id}/events`,
      label: t('employees.events'),
    },
    {
      label: event.title,
    }
  ];

  return (
    <>
      <NextSeo
        title={event.title}
        canonical={canonical}
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

EmployeeEventShow.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return {user};
};

EmployeeEventShow.getLayout = page => page;

export default EmployeeEventShow;
