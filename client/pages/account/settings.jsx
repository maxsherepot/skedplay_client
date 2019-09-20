import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import redirect from "lib/redirect";
import { MainLayout } from "layouts";
import { UPDATE_USER } from "queries";
import { ArrowBack } from "UI";
import checkLoggedIn from "lib/checkLoggedIn";
import { EditAccount } from "components/account";

const Edit = ({ loggedInUser }) => {
  const [onSubmit] = useMutation(UPDATE_USER);

  const Breadcrumbs = () => (
    <div className="fluid-container">
      <div className="flex items-center py-4">
        <ArrowBack back />
        <div className="ml-10">
          <Link href="/account/[id]" as={`/account/${loggedInUser.id}`}>
            <a className="text-red hover:text-pink">My account</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          Account setting
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout user={loggedInUser}>
      <Breadcrumbs />
      <div className="fluid-container">
        <div className="bg-white shadow rounded-lg p-8">
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
