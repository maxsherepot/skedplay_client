import { useMutation } from "@apollo/react-hooks";
import redirect from "lib/redirect";
import { MainLayout } from "layouts";
import { UPDATE_USER } from "queries";
import checkLoggedIn from "lib/checkLoggedIn";
import EditAccount from "components/employee/EditAccount";

const Edit = ({ loggedInUser }) => {
  const [onSubmit] = useMutation(UPDATE_USER);

  return (
    <MainLayout user={loggedInUser}>
      <div className="fluid-container">
        <div className="bg-white shadow rounded-lg p-8 mt-6">
          <div className="text-2xl font-extrabold tracking-tighter leading-none my-5 mx-3">
            Contact Information
          </div>
          <p className="italic mb-5 mx-3">
            This information need only for site administrators, and account
            control.
          </p>

          <EditAccount initialValues={loggedInUser} onSubmit={onSubmit} />
        </div>
      </div>
    </MainLayout>
  );
};

Edit.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    redirect(context, "/login");
  }
  return { loggedInUser };
};

export default Edit;
