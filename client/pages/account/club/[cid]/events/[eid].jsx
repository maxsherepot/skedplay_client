import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {useQuery} from "@apollo/react-hooks";
import {GET_CLUB} from "queries";
import EditEventBox from "components/account/club/EditEventBox";

const AccountClubEventsEdit = ({user}) => {
    const {query: {eid}} = useRouter();
    // const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
    //     variables: {
    //         id: cid
    //     }
    // });

    console.log(eid)

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    return (
        <EditEventBox />
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
