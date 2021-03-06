import React from "react";

import AddEmployee from "components/employee/AddEmployee";
import checkLoggedIn from "lib/checkLoggedIn";
import redirect from "lib/redirect";

const GirlsAd = () => {
  return <AddEmployee />;
};

GirlsAd.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

export default GirlsAd;
