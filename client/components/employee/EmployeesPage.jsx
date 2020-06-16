import EmployeesSearch from "components/EmployeesSearch";
import {useQuery} from "@apollo/react-hooks";
import { GET_FILTERS_STATE, EMPLOYEES_PAGE_DATA, EMPLOYEES_SEO } from "queries";
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

const EmployeesPage = ({isGeolocationEnabled, entityName, entityUrl, user}) => {
  const ENTITY_NAME = entityName;
  const {t, i18n} = useTranslation();

  let {query} = useRouter();

  const { data: { page, cantons, cities, services, employee_race_types } = {}, loading} = useQuery(EMPLOYEES_PAGE_DATA, {
    variables: {
      key: entityUrl,
    }
  });

  const { loading: filtersLoading, data: { filters } = {}, error } = useQuery(GET_FILTERS_STATE);

  const { loading: seoLoading, data: { employeesSeo } = {}, refetch: refetchSeo } = useQuery(
    EMPLOYEES_SEO,
    {
      variables: {
        input: {
          canton: query.canton || null,
          city: query.city || null,
          services: query.services || [],
          employee_type: entityUrl
        }
      }
    }
  );

  if (loading || seoLoading || filtersLoading) {
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

  const title = employeesSeo.title || page.title;

  const description = employeesSeo.description || page.description;

  const keywords = employeesSeo.keywords || page.keywords;

  const header = employeesSeo.h1 || page.header;

  return (
    <>
      <NextSeo
        title={translation.getLangField(title, i18n.language)}
        description={translation.getLangField(description, i18n.language)}
        canonical={needCanonical ? `${process.env.APP_URL}${canonical}` : null}

        additionalMetaTags={[{
          name: 'keywords',
          content: translation.getLangField(keywords, i18n.language)
        }]}
      />

      <EmployeesSearch
        header={translation.getLangField(header, i18n.language)}
        rootHeader={translation.getLangField(page.header, i18n.language)}
        entityName={ENTITY_NAME}
        fields={fields}
        initialFilters={initialFilters}
        filters={workFilters}
        redirectByFilters={redirectByFilters}
        commonGirlsFilterUrl={commonGirlsFilterUrl}
        entityUrl={entityUrl}
        user={user}
      />
    </>
  );
};

let geoLocatedPage = geolocated()(EmployeesPage);

export default geoLocatedPage;
