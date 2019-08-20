import React, { Fragment } from "react";
import Link from "next/link";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import LoginBox from "components/LoginBox";

function Login() {
  return (
    <Fragment>
      {/* LoginBox handles all login logic. */}
      <LoginBox />
      <hr />
      New?{" "}
      <Link href="/create-account">
        <a>Create account</a>
      </Link>
    </Fragment>
  );
}

Login.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser.me) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(ctx, "/");
  }

  return {};
};

export default Login;
