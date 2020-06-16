import EmployeesPage from "components/employee/EmployeesPage";
import checkLoggedIn from "lib/checkLoggedIn";

const GirlsSearch = ({user}) => {
  return (
    <EmployeesPage entityName={`girls`} entityUrl={`girls`} user={user}/>
  );
};

GirlsSearch.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);

  return { user };
};

export default GirlsSearch;
