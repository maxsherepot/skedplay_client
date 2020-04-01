import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter } from "UI";
import { usePagination } from "hooks";
import {useState} from "react";
import {Sort} from "UI";
import React from "react";
import filterHelpers from "UI/Filter/helpers";

const EntitySearch = ({ user, entityName, fields, filters, Box, entityQuery }) => {
  const [page, setPage] = usePagination();
  const [filtersState, setFiltersState] = useState({});

  let stateFilters = filtersState;

  if (Object.keys(filtersState).length === 0) {
    stateFilters = filterHelpers.filterFilters(filters[entityName]);
  }

  let filteredFilters = stateFilters;

  let filtersForQuery = Object.assign({}, filteredFilters);

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
    filteredFilters[key] = value;

    setFiltersState(filterHelpers.filterFilters(filteredFilters));

    refetch();
  }

  function setFilters(filters) {
    setFiltersState(filterHelpers.filterFilters(filters));
    refetch();
  }

  const sorts = [
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

  return (
    <>
      <Filter
        name={entityName}
        inititalState={filters[entityName]}
        filters={filteredFilters}
        fields={fields}
        setFilter={setFilter}
        setFilters={setFilters}
        bgClass={entityName + '-search'}
      />
      <Box
        sortComponent={<Sort sorts={sorts} setFilter={setFilter} orderBy={filteredFilters.orderBy}/>}
        loading={entitiesLoading}
        error={entitiesError}
        page={page}
        setPage={setPage}
        entities={entities}
        networkStatus={networkStatus}
      />
    </>
  );
};

EntitySearch.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

export default EntitySearch;
