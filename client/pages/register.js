import React, { Fragment } from "react";

import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import RegisterBox from "components/RegisterBox";

function Register() {
  return (
    <Fragment>
      <RegisterBox />
    </Fragment>
  );
}

Register.getInitialProps = async ctx => {
  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser.me) {
    redirect(ctx, "/");
  }

  return {};
};

export default Register;
