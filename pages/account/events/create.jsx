import React from "react";
import redirect from "lib/redirect";
import {EventForm} from "components/event";
import {getLayout} from "components/account/AccountLayout";
import checkLoggedIn from "lib/checkLoggedIn";
import {useRouter} from "next/router";
import {getErrors} from "utils";
import {
  CREATE_EMPLOYEE_EVENT,
  GET_MY_EMPLOYEE_EVENTS_COUNT,
  EVENTS_BY_OWNER, GET_MY_EMPLOYEES,
} from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import CreateEventBox from "components/account/club/CreateEventBox";
import {Loader} from 'UI';

const AccountEventsCreate = ({user}) => {
  const [createUserEvent] = useMutation(CREATE_EMPLOYEE_EVENT, {
    refetchQueries: [
      {
        query: GET_MY_EMPLOYEE_EVENTS_COUNT,
      }
    ]
  });

  const onSubmit = async variables => await createUserEvent(variables);

  const {loading: employeesLoading, data} = useQuery(GET_MY_EMPLOYEES);

  const employees = (data && data.me && data.me.employees) || [];

  return (
    <>
      {employeesLoading && <Loader/>}
      <CreateEventBox
        employees={employees}
        initialValues={{
          employees: [],
          title: "",
          event_type_id: "",
          description: "",
          mode: "1",
          address: "",
          start_date: "",
          end_date: "",
          start_time: "",
          days: [],
          employees_ids: [],
          club_id: null,
          price: null,
          photos: [],
          mainPhoto: null,
        }}
        onSubmit={onSubmit}
      />
    </>
  );
};

AccountEventsCreate.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return {user};
};

AccountEventsCreate.getLayout = getLayout;

export default AccountEventsCreate;