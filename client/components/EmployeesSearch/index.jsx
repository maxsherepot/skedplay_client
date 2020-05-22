import { useQuery } from "@apollo/react-hooks";
import { Filter } from "UI";
import { ALL_EMPLOYEES } from "queries";
import EmployeesBox from "components/EmployeesBox";
import { usePagination } from "hooks";
import {useState} from "react";
import {Sort, Breadcrumbs} from "UI";
import React from "react";
import filterHelpers from "UI/Filter/helpers";
import {useTranslation} from "react-i18next";
import {Router} from 'lib/i18n';
import translation from "services/translation";

const GirlsSearch = ({ entityName, entityUrl, header, fields, initialFilters, filters, redirectByFilters, commonGirlsFilterUrl }) => {
  const [page, setPage] = usePagination();
  const [filtersState, setFiltersState] = useState(filterHelpers.filterFilters(filters[entityName]));
  const {t, i18n} = useTranslation();

  let filtersForQuery = Object.assign({}, filtersState);

  // 1 - active, 2 - coming soon
  filtersForQuery.show_level = filtersForQuery.show_level ? [1, 2] : [1];

  const { loading: employeesLoading, error: employeesError, data: { employees } = {}, refetch, networkStatus } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 10,
      page,
      filters: {
        ...filtersForQuery
      }
    }
  });

  const breadcrumbs = [
    {
      as: `/${entityUrl}`,
      href: `/${entityUrl}`,
      label: header,
      onClick: () => {
        setFiltersState(filterHelpers.filterFilters(initialFilters[entityName]));
      }
    },
    ...commonGirlsFilterUrl.getBreadcrumbs(),
  ];

  function setFilter(key, value) {
    filtersState[key] = value;

    setFiltersState(filterHelpers.filterFilters(filtersState));

    redirectByFilters(filterHelpers.filterFilters(filtersState));
  }

  function setFilters(filters) {
    setFiltersState(filterHelpers.filterFilters(filters));

    redirectByFilters(filterHelpers.filterFilters(filters));
  }

  const sorts = [
    {
      id: 1,
      label: t('employees.first_young'),
      orderBy: [
        {
          field: "fake",
          order: 'ASC',
        },
        {
          field: "age",
          order: 'ASC',
        },
      ],
    },
    {
      id: 2,
      label: t('employees.first_old'),
      orderBy: [
        {
          field: "fake",
          order: 'ASC',
        },
        {
          field: "age",
          order: 'DESC',
        },
      ],
    },
  ];

  const filterName = entityName.replace('_', ' ');

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs}
      />

      <Filter
        name={filterName}
        header={header}
        inititalState={initialFilters[entityName]}
        filters={filtersState}
        fields={fields}
        setFilter={setFilter}
        setFilters={setFilters}
        bgClass="employee-search"
      />
      <EmployeesBox
        sortComponent={<Sort sorts={sorts} setFilter={setFilter} orderBy={filtersState.orderBy}/>}
        loading={employeesLoading}
        error={employeesError}
        page={page}
        setPage={setPage}
        employees={employees}
        networkStatus={networkStatus}
      />
    </>
  );
};

export default GirlsSearch;
