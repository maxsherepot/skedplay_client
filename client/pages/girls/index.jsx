import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter } from "UI";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS } from "queries";
import EmployeesBox from "components/EmployeesBox";

const ENTITY_NAME = "girls";

const GirlsSearch = ({ user }) => {
  const { loading, data: { services, employee_race_types } = {} } = useQuery(
    GIRLS_FILTER_OPTIONS
  );

  const { loading: filtersLoading, data: { filters } = {} } = useQuery(GET_FILTERS_STATE);

  if (loading || filtersLoading) {
    return "Loading...";
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
      label: "Age"
    }
  ];

  return (
    <>
      <Filter
        name={ENTITY_NAME}
        inititalState={filters[ENTITY_NAME]}
        fields={fields}
      />
      <EmployeesBox inititalState={filters[ENTITY_NAME]} />
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
