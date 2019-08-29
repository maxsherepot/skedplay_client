import React from "react";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";

import { AnimationBackground } from "UI";

const Invoice = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <AnimationBackground full />
      <div className="container mx-auto">
        <div className="flex items-center flex-col">Invoice page</div>
      </div>
    </>
  );
};

Invoice.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default Invoice;
