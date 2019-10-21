import { useRouter } from "next/router";

import { GET_EMPLOYEE } from "queries";
import { useQuery } from "@apollo/react-hooks";
import EmployeeBox from "components/employee/EmployeeBox";
import EditServices from "components/employee/EditServices";

const EmployeeEditServices = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { employee } = {}, loading } = useQuery(GET_EMPLOYEE, {
    variables: {
      id
    }
  });

  if (loading) {
    return "Loading...";
  }

  return (
    <EmployeeBox employee={employee} user={loggedInUser} viewed={false}>
      <div className="bg-white shadow rounded-lg p-8 mt-6">
        <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
          Price and Services
        </div>
        <EditServices initialValues={employee} />
      </div>
    </EmployeeBox>
  );
};

export default EmployeeEditServices;
