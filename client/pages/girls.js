import checkLoggedIn from "lib/checkLoggedIn";

import { MainLayout } from "layouts";
import EmployeesBox from "components/EmployeesBox";

function Employees({ loggedInUser }) {
  return (
    <MainLayout user={loggedInUser}>
      {/* <Filter name="Events"></Filter> */}
      <EmployeesBox></EmployeesBox>
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
