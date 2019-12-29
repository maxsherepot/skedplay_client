import React from "react";

import AddEmployee from "components/employee/AddEmployee";
import {useRouter} from "next/router";

const ClubEmployeeAdd = () => {
  const {query: {cid: clubId}} = useRouter();

  return <AddEmployee clubId={clubId} />;
};

export default ClubEmployeeAdd;
