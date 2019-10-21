import React from "react";
import redirect from "lib/redirect";
import { getLayout } from "components/account/AccountLayout";
import checkLoggedIn from "lib/checkLoggedIn";

const AccountEventsCreate = ({ user }) => {
    return (
        <>
            Create event
            {/*<EditClubBox club={club} user={loggedInUser} />*/}
        </>
    );
};

AccountEventsCreate.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

AccountEventsCreate.getLayout = getLayout;

export default AccountEventsCreate;
