import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter } from "UI";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS, ALL_EMPLOYEES } from "queries";
import EmployeesBox from "components/EmployeesBox";
import { usePagination } from "hooks";
import {useState} from "react";

const GirlsSearch = ({ user, entityName }) => {
  const [page, setPage] = usePagination();

  const { loading, data: { services, employee_race_types } = {} } = useQuery(
    GIRLS_FILTER_OPTIONS
  );

  const { loading: filtersLoading, data: { filters } = {}, error } = useQuery(GET_FILTERS_STATE);

  if (loading || filtersLoading) {
    return "Loading...";
  }

  filters[entityName].orderBy = [
    {
      field: "age",
      order: 'ASC',
    }
  ];

  filters[entityName].age = {
    from: 18,
    to: 45,
  };

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
      options: services.map(s => {
        return { label: s.name, value: s.id };
      })
    },
    {
      component: "select",
      name: "gender",
      label: "Gender",
      placeholder: "Select gender",
      options: [
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
    }
  ];

  function filterFilters(filters) {
    const filteredFilters = [];

    Object.keys(filters).map(key => {
      if (filters[key] === "") return;

      if (filters[key] === null) {
        return (filters[key] = "");
      }

      filteredFilters[key] = filters[key];
    });

    return filteredFilters;
  }

  let filteredFilters = filterFilters(filters[entityName]);

  const [filtersState, setFiltersState] = useState(filteredFilters);

  const { loading: employeesLoading, error: employeesError, data: { employees } = {}, refetch, networkStatus } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 10,
      page,
      filters: {
        ...filtersState
      }
    }
  });

  function setFilter(key, value) {
    console.log('setFilter', key, value);
    filteredFilters[key] = value;

    setFiltersState(filterFilters(filteredFilters));

    refetch();
  }

  function setFilters(filters) {
    console.log('filtered filters', filterFilters(filters));


    setFiltersState(filterFilters(filters));
    refetch();
  }

  return (
    <>
      <Filter
        name={entityName}
        inititalState={filters[entityName]}
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
