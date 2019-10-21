import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {useQuery} from "@apollo/react-hooks";
import {GET_EVENT} from "queries";
import EditEventBox from "components/account/club/EditEventBox";

const AccountClubEventsEdit = () => {
    const {query: {eid}} = useRouter();

    const {data: {event} = {}, loading} = useQuery(GET_EVENT, {
        variables: {
            id: eid
        }
    });

    console.log(event);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <EditEventBox initialValues={{ ...event, type_id: +event.type.id }} />
    );
};

AccountClubEventsEdit.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return {user};
};

AccountClubEventsEdit.getLayout = getLayout;

export default AccountClubEventsEdit;
