import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter } from "UI";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS, ALL_EMPLOYEES } from "queries";
import EmployeesBox from "components/EmployeesBox";
import { usePagination } from "hooks";
import {useState} from "react";

const GirlsSearch = ({ user, entityName }) => {
  const [page, setPage] = usePagination();
  const [filtersState, setFiltersState] = useState({});

  const { loading, data: { services, employee_race_types } = {} } = useQuery(
    GIRLS_FILTER_OPTIONS
  );

  const { loading: filtersLoading, data: { filters } = {}, error } = useQuery(GET_FILTERS_STATE);

  if (loading || filtersLoading) {
    return "Loading...";
  }

  if (error || !filters) {
    console.log(error);

    return 'error';
  }

  const fields = [
    // {
    //   component: "select",
    //   name: "location",
    //   label: "Location",
    //   placeholder: "Select your location",
    //   options: [
    //     {
    //       label: "Zürich",
    //       value: "zürich"
    //     },
    //     {
    //       label: "Geneva",
    //       value: "geneva"
    //     },
    //     {
    //       label: "Basel",
    //       value: "basel"
    //     },
    //     {
    //       label: "Lausanne",
    //       value: "lausanne"
    //     },
    //     {
    //       label: "Bern",
    //       value: "bern"
    //     },
    //     {
    //       label: "Winterthur",
    //       value: "winterthur"
    //     },
    //     {
    //       label: "Lucerne",
    //       value: "lucerne"
    //     }
    //   ]
    // },
    {
      component: "multi-select",
      name: "services",
      label: "Services",
      placeholder: "Select services",
      showCheckboxes: true,
      options: services.map(s => {
        return { label: s.name, value: s.id };
      })
    },
    {
      component: "select",
      name: "gender",
      label: "Gender",
      placeholder: "All Gender",
      options: [
        {
          label: "All Gender",
          value: ''
        },
        {
          label: "Female",
          value: 2
        },
        {
          label: "Male",
          value: 1
        }
      ]
    },
    {
      component: "select",
      name: "race_type_id",
      label: "Type",
      placeholder: "Select type",
      options: employee_race_types.map(s => {
        return { label: s.name, value: s.id };
      })
    },
    {
      component: "range",
      name: "age",
      label: "Age",
      from: 18,
      to: 45,
      labelResolver({from, to}) {
        if (parseInt(from) === 18 && parseInt(to) === 45) {
          return null;
        }

        return `Age from ${from} to ${to}`;
      }
    },
    {
      component: "checkbox",
      name: "show_level",
      label: "Coming soon",
      checked: false,
      labelResolver(value) {
        if (value) {
          return this.label;
        }

        return null;
      }
    },
  ];

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
        inititalState={filters[entityName]}
        loading={employeesLoading}
        error={employeesError}
        page={page}
        setPage={setPage}
        employees={employees}
        setFilter={setFilter}
        setFilters={setFilters}
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
