import React from "react";
import redirect from "lib/redirect";
import { AccountBox } from "components/account";
import checkLoggedIn from "lib/checkLoggedIn";

const CreateEvent = ({ loggedInUser }) => {
    return (
        <AccountBox user={loggedInUser}>
            Create event
            {/*<EditClubBox club={club} user={loggedInUser} />*/}
        </AccountBox>
    );
};

CreateEvent.getInitialProps = async context => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    if (!loggedInUser) {
        redirect(context, "/login");
    }

    return { loggedInUser };
};

export default CreateEvent;
