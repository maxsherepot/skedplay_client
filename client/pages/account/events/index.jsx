import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import { getLayout } from "components/account/AccountLayout";

const AccountEventsIndex = ({ user }) => {
    return (
        <>
            <div className="text-2xl font-extrabold tracking-tighter leading-none mb-5">
                Events
            </div>

            Events
        </>
    );
};

AccountEventsIndex.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

AccountEventsIndex.getLayout = getLayout;

export default AccountEventsIndex;
