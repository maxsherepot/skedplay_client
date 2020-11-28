import React from "react";

import AddEmployee from "components/employee/AddEmployee";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";

const ClubEmployeeAdd = () => {
  let {query: {cid: clubId}} = useRouter();
  clubId = clubId.replace('/', '');
  return <AddEmployee clubId={clubId} />;
};


ClubEmployeeAdd.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return [];
  }
  return {user};
};

export default ClubEmployeeAdd;
