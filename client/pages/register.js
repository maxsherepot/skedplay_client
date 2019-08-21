import React, { Fragment } from "react";
import Link from "next/link";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import RegisterBox from "components/RegisterBox";

function Register() {
  return (
    <Fragment>
      <RegisterBox />
      <hr />
      Already have an account?{" "}
      <Link href="/login">
        <a>Sign in</a>
      </Link>
    </Fragment>
  );
}

Register.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser.me) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(ctx, "/");
  }

  return {};
};

export default Register;
