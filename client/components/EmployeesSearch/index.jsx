import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter } from "UI";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS, ALL_EMPLOYEES } from "queries";
import EmployeesBox from "components/EmployeesBox";
import { usePagination } from "hooks";
import {useState} from "react";
import {Sort} from "UI";
import React from "react";

const GirlsSearch = ({ user, entityName, fields, filters, }) => {
  const [page, setPage] = usePagination();
  const [filtersState, setFiltersState] = useState({});

  function filterFilters(filters) {
    const filteredFilters = {};

    Object.keys(filters).map(key => {
      if (filters[key] === "") return;

      if (filters[key] === null) {
        return (filters[key] = "");
      }

      let filter = filters[key];

      if (key === 'age') {
        delete filter.__typename;
      }

      if (key === 'orderBy') {
        delete filter[0].__typename;
      }

      if (key === 'show_level') {
        // 1 - active, 2 - soon
        // filter = filter ? 2 : 1;
        filter = !!filter;
      }

      filteredFilters[key] = filter;
    });

    // if (!filteredFilters.show_level) {
    //   filteredFilters.show_level = 1;
    // }

    return filteredFilters;
  }

  let stateFilters = filtersState;

  if (Object.keys(filtersState).length === 0) {
    stateFilters = filterFilters(filters[entityName]);
  }

  let filteredFilters = stateFilters;

  let filtersForQuery = Object.assign({}, filteredFilters);

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

  function setFilter(key, value) {
    filteredFilters[key] = value;

    setFiltersState(filterFilters(filteredFilters));

    refetch();
  }

  function setFilters(filters) {
    setFiltersState(filterFilters(filters));
    refetch();
  }

  const sorts = [
    {
      id: 1,
      label: 'First: young',
      orderBy: [
        {
          field: "age",
          order: 'ASC',
        }
      ],
    },
    {
      id: 2,
      label: 'First: old',
      orderBy: [
        {
          field: "age",
          order: 'DESC',
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
      />
      <EmployeesBox
        sortComponent={<Sort sorts={sorts} setFilter={setFilter} orderBy={filteredFilters.orderBy}/>}
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

GirlsSearch.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

export default GirlsSearch;