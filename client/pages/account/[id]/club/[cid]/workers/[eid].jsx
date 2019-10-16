import React, { useState } from "react";
import redirect from "lib/redirect";
import cx from "classnames";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import { AccountBox } from "components/account";
import { Button, Tab, Panel } from "UI";
import { Tabs } from "@bumaga/tabs";
import { CalendarSvg, ChevronDownSvg } from "icons";
import { SCHEDULE_WEEK_PERIOD } from "queries";
import {
    GET_CLUB,
} from "queries";
import { useQuery } from "@apollo/react-hooks";
import StepBox from "components/StepBox";


const AccountWorkers = ({ loggedInUser }) => {
    const { query: { eid } } = useRouter();
    // const { data: { club } = {}, loading} = useQuery(GET_CLUB, {
    //     variables: {
    //         id: cid
    //     }
    // });
    const [collapse, setCollapse] = useState(0);
    const links = [
        'Information',
        'Services and Prices',
        'Photos and videos',
        'Schedule and activation',
    ];

    console.log(eid)

    // if (loading) return null;

    return <AccountBox user={loggedInUser} collapse={collapse} setCollapse={setCollapse}>
        <div className="flex flex-col lg:flex-row justify-between">
            <StepBox links={links} stepName="editClubEmployee" />
        </div>
        <div className="border-b border-divider" />
    </AccountBox>;
};

AccountWorkers.getInitialProps = async context => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    if (!loggedInUser) {
        redirect(context, "/login");
    }

    return { loggedInUser };
};

export default AccountWorkers;
