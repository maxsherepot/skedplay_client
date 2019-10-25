import React from "react";
import redirect from "lib/redirect";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import StepBox from "components/StepBox";
import { EditEmployeeBox } from "components/employee";
import {
    GET_EMPLOYEE,
} from "queries";
import { useQuery } from "@apollo/react-hooks";
import { getLayout } from "components/account/AccountLayout";

const AccountAdEdit = () => {
    const { query: { eid } } = useRouter();
    const { data: { employee } = {}, loading} = useQuery(GET_EMPLOYEE, {
        variables: {
            id: eid
        }
    });

    const links = [
        "Card / Ad Information",
        "Services and price",
        "Photos and videos",
        "Schedule and activation"
    ];

    if (loading) {
        return  <div>Loading...</div>
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between">
                <StepBox links={links} />
            </div>
            <div className="border-b border-divider" />
            <EditEmployeeBox employee={employee} />
        </>
    );
};

AccountAdEdit.getLayout = getLayout;

AccountAdEdit.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

export default AccountAdEdit;
