import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { Filter } from "UI";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS } from "queries";
import { MainLayout } from "layouts";
import EmployeesBox from "components/EmployeesBox";

function Employees({ loggedInUser }) {
  const {
    loading,
    data: { services, employee_race_types }
  } = useQuery(GIRLS_FILTER_OPTIONS);

  const {
    data: {
      filters: { girls }
    }
  } = useQuery(GET_FILTERS_STATE);

  if (loading) {
    return "Loading...";
  }

  const fields = [
    {
      component: "select",
      name: "location",
      label: "Location",
      placeholder: "Select your location",
      options: [
        {
          label: "Zürich",
          value: "zürich"
        },
        {
          label: "Geneva",
          value: "geneva"
        },
        {
          label: "Basel",
          value: "basel"
        },
        {
          label: "Lausanne",
          value: "lausanne"
        },
        {
          label: "Bern",
          value: "bern"
        },
        {
          label: "Winterthur",
          value: "winterthur"
        },
        {
          label: "Lucerne",
          value: "lucerne"
        }
      ]
    },
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
      name: "race_type",
      label: "Type",
      placeholder: "Select type",
      options: employee_race_types.map(s => {
        return { label: s.name, value: s.id };
      })
    }
  ];

  return (
    <MainLayout user={loggedInUser}>
      <Filter name="girls" inititalState={girls} fields={fields}></Filter>
      <EmployeesBox inititalState={girls}></EmployeesBox>
    </MainLayout>
  );
}

Employees.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default Employees;
