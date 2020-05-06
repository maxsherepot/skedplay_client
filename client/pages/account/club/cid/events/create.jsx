import React from "react";
import redirect from "lib/redirect";
import {CREATE_CLUB_EVENT, GET_CLUB} from "queries";
import checkLoggedIn from "lib/checkLoggedIn";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {getLayout} from "components/account/AccountLayout";
import CreateEventBox from "components/account/club/CreateEventBox";

import {Loader} from 'UI';
import {useRouter} from "next/router";

const AccountClubEventsCreate = () => {
  const {query: {cid}} = useRouter();

  const [createClubEvent] = useMutation(CREATE_CLUB_EVENT);

  const onSubmit = async variables => await createClubEvent(variables);

  const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
    fetchPolicy: 'no-cache',
    variables: {
      id: cid
    }
  });

  if (loading) {
    return <Loader/>;
  }

  return (
    <CreateEventBox
      initialValues={{
        club: club,
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
  );
};

AccountClubEventsCreate.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return {user};
};

AccountClubEventsCreate.getLayout = getLayout;

export default AccountClubEventsCreate;
