import React from "react";
import { useRouter } from "next/router";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { NewClubBox } from "components/club";
import { MainLayout } from "layouts";
import { CloseSvg } from "icons";
import { PageCard } from "UI";

const Invoice = ({ loggedInUser }) => {
  const router = useRouter();

  return (
    <MainLayout user={loggedInUser}>
      <div className="fluid-container">
        <div className="flex flex-col md:flex-row items-center justify-between hd:w-7/12 mx-auto py-8">
          <div className="text-4-65xl font-extrabold">Adding a new Club</div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.back()}
          >
            <CloseSvg width={18} height={18} />
            <div className="ml-2">Close without saves</div>
          </div>
        </div>
      </div>
      <PageCard>
        <NewClubBox />
      </PageCard>
    </MainLayout>
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
