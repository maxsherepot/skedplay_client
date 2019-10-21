import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import EditEventBox from "components/account/club/EditEventBox";

const AccountClubEventsCreate = ({user}) => {
    const {query: {eid}} = useRouter();
    console.log(eid)


    return (
        <EditEventBox />
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
