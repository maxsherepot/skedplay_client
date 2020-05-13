import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter, Breadcrumbs } from "UI";
import { usePagination } from "hooks";
import {useState} from "react";
import {Sort} from "UI";
import React from "react";
import filterHelpers from "UI/Filter/helpers";

const EntitySearch = ({ header, entityName, fields, initialFilters, filters, Box, entityQuery, redirectByFilters, entityFilterUrl }) => {
  const [page, setPage] = usePagination();
  const [filtersState, setFiltersState] = useState(filterHelpers.filterFilters(filters[entityName]));

  let filtersForQuery = Object.assign({}, filtersState);

  const { loading: entitiesLoading, error: entitiesError, data = {}, refetch, networkStatus } = useQuery(entityQuery, {
    variables: {
      first: 10,
      page,
      filters: {
        ...filtersForQuery
      }
    }
  });

  const entities = data[entityName];

  function setFilter(key, value) {
    filtersState[key] = value;

    setFiltersState(filterHelpers.filterFilters(filtersState));

    redirectByFilters(filterHelpers.filterFilters(filtersState));
  }

  function setFilters(filters) {
    setFiltersState(filterHelpers.filterFilters(filters));

    redirectByFilters(filterHelpers.filterFilters(filters));
  }

  const breadcrumbs = [
    {
      as: `/${entityName}`,
      href: `/${entityName}`,
      label: header,
      onClick: () => {
        setFiltersState(filterHelpers.filterFilters(initialFilters[entityName]));
      }
    },
    ...entityFilterUrl.getBreadcrumbs(),
  ];

  let sorts = [];

  if (entityName === 'clubs') {
    sorts = [
      {
        id: 1,
        label: 'start early',
        orderBy: [
          {
            field: "start_time",
            order: 'ASC',
          }
        ],
      },
      {
        id: 2,
        label: "start later",
        orderBy: [
          {
            field: "start_time",
            order: 'DESC'
          }
        ],
      },
    ];
  }

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs}
      />

      <Filter
        header={header}
        name={entityName}
        inititalState={initialFilters[entityName]}
        filters={filtersState}
        fields={fields}
        setFilter={setFilter}
        setFilters={setFilters}
        bgClass={entityName + '-search'}
      />
      {entityName === 'clubs' ? (
          <Box
              sortComponent={<Sort sorts={sorts} setFilter={setFilter} orderBy={filtersState.orderBy}/>}
              loading={entitiesLoading}
              error={entitiesError}
              page={page}
              setPage={setPage}
              entities={entities}
              networkStatus={networkStatus}
          />
      ) : (
          <Box
              loading={entitiesLoading}
              error={entitiesError}
              page={page}
              setPage={setPage}
              entities={entities}
              networkStatus={networkStatus}
          />
      )}

    </>
  );
};

export default EntitySearch;
