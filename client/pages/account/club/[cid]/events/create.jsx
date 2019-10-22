import React from "react";
import redirect from "lib/redirect";
import {CREATE_CLUB_EVENT} from "queries";
import checkLoggedIn from "lib/checkLoggedIn";
import {useMutation} from "@apollo/react-hooks";
import {getLayout} from "components/account/AccountLayout";
import CreateEventBox from "components/account/club/CreateEventBox";

const AccountClubEventsCreate = () => {
    const [createClubEvent] = useMutation(CREATE_CLUB_EVENT);

    const onSubmit = async variables => await createClubEvent(variables);

    return (
        <CreateEventBox initialValues={{ title: "", description: "", event_type_id: "" }} onSubmit={onSubmit} />
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
