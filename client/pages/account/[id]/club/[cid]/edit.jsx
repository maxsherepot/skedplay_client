import React from "react";
import redirect from "lib/redirect";
import { useRouter } from "next/router";
import { AccountBox } from "components/account";
import checkLoggedIn from "lib/checkLoggedIn";
import StepBox from "components/StepBox";
import { EditClubBox } from "components/club";
import {
    GET_CLUB,
} from "queries";
import { useQuery } from "@apollo/react-hooks";

const ClubEdit = ({ loggedInUser }) => {
    const { query: { cid } } = useRouter();
    const { data: { club } = {}, loading} = useQuery(GET_CLUB, {
        variables: {
            id: cid
        }
    });
    const links = [
        'Information',
        'Services and Prices',
        'Photos and videos',
        'Schedule and activation',
    ];

    if (loading) {
        return  <div>Loading...</div>
    }

    return (
        <AccountBox contentClass="lg:w-3/5" user={loggedInUser}>
            <div className="flex flex-col lg:flex-row justify-between">
                <StepBox links={links} />
            </div>
            <div className="border-b border-divider" />
            <EditClubBox club={club} user={loggedInUser} />
        </AccountBox>
    );
};

ClubEdit.getInitialProps = async context => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    if (!loggedInUser) {
        redirect(context, "/login");
    }

    return { loggedInUser };
};

export default ClubEdit;
