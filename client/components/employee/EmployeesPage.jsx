import EmployeesSearch from "components/EmployeesSearch";
import {useQuery} from "@apollo/react-hooks";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS, CANTONS_AND_CITIES, GET_PAGE } from "queries";
import {useTranslation} from "react-i18next";
import {Loader} from "UI";
import { geolocated } from "react-geolocated";
import helpers from "UI/Filter/helpers";
import {useRouter} from "next/router";
import {Router} from 'lib/i18n';
import CommonGirlsFilterUrl from "services/CommonGirlsFilterUrl";
import React from "react";
import translation from "services/translation";
import { NextSeo } from 'next-seo';

const EmployeesPage = ({isGeolocationEnabled, entityName, entityUrl}) => {
  const ENTITY_NAME = entityName;
  const {t, i18n} = useTranslation();

  let {query} = useRouter();

  const { data: { page } = {}, loading: pageLoading} = useQuery(GET_PAGE, {
    variables: {
      key: entityUrl
    }
  });

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  const { loading, data: { services, employee_race_types } = {} } = useQuery(
    GIRLS_FILTER_OPTIONS
  );

  const { loading: filtersLoading, data: { filters } = {}, error } = useQuery(GET_FILTERS_STATE);

  if (pageLoading || loading || cantonsLoading || filtersLoading) {
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

  const {as: canonical, needCanonical} = commonGirlsFilterUrl.getRouterParams(workFilters[ENTITY_NAME], true);

  const redirectByFilters = (filters) => {
    let {url, as} = commonGirlsFilterUrl.getRouterParams(filters);

    Router.replace(url, as, {shallow: true});
  };

  return (
    <>
      <NextSeo
        title={translation.getLangField(page.title, i18n.language)}
        description={translation.getLangField(page.description, i18n.language)}
        keywords={translation.getLangField(page.keywords, i18n.language)}
        canonical={needCanonical ? `${process.env.APP_URL}${canonical}` : null}
      />

      <EmployeesSearch
        header={translation.getLangField(page.header, i18n.language)}
        entityName={ENTITY_NAME}
        fields={fields}
        initialFilters={initialFilters}
        filters={workFilters}
        redirectByFilters={redirectByFilters}
      />
    </>
  );
};

let geoLocatedPage = geolocated()(EmployeesPage);

export default geoLocatedPage;
