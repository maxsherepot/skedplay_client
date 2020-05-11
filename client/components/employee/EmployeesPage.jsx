import EmployeesSearch from "components/EmployeesSearch";
import {useQuery} from "@apollo/react-hooks";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS, CANTONS_AND_CITIES } from "queries";
import {useTranslation} from "react-i18next";
import {Loader} from "UI";
import { geolocated } from "react-geolocated";
import checkLoggedIn from "lib/checkLoggedIn";
import helpers from "UI/Filter/helpers";
import {useRouter} from "next/router";
import {Router} from 'lib/i18n';
import CommonGirlsFilterUrl from "services/CommonGirlsFilterUrl";

const EmployeesPage = ({isGeolocationEnabled, entityName, entityUrl}) => {
  const ENTITY_NAME = entityName;
  const {t, i18n} = useTranslation();

  let {query} = useRouter();

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  const { loading, data: { services, employee_race_types } = {} } = useQuery(
    GIRLS_FILTER_OPTIONS
  );

  const { loading: filtersLoading, data: { filters } = {}, error } = useQuery(GET_FILTERS_STATE);

  if (loading || cantonsLoading || filtersLoading) {
    return <Loader/>;
  }

  if (error || !filters) {
    console.log(error);

    return 'error';
  }

  const commonGirlsFilterUrl = new CommonGirlsFilterUrl(
    query,
    {cantons, cities, services, races: employee_race_types},
    entityUrl
  );

  const initialFilters = JSON.parse(JSON.stringify(filters));
  const workFilters = JSON.parse(JSON.stringify(filters));

  if (commonGirlsFilterUrl.pageNotFound()) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  workFilters[ENTITY_NAME] = commonGirlsFilterUrl.setFilters(workFilters[ENTITY_NAME]);

  let fields = [
    ...helpers.getGirlsFilters(cantons, cities, services, employee_race_types, t),
  ];

  if (!isGeolocationEnabled) {
    fields.splice(fields.length - 2, 1);
  }

  const redirectByFilters = (filters) => {
    let {url, as} = commonGirlsFilterUrl.getRouterParams(filters);

    Router.replace(url, as, {shallow: true});
  };

  return (
    <>
      <EmployeesSearch entityName={ENTITY_NAME} fields={fields} initialFilters={initialFilters} filters={workFilters} redirectByFilters={redirectByFilters} />
    </>
  );
};

let geoLocatedPage = geolocated()(EmployeesPage);

export default geoLocatedPage;
