import React, {useRef} from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {EditEmployeeBox} from "components/employee";
import {Loader} from "UI";
import {
    GET_EMPLOYEE,
} from "queries";

import {useMutation, useQuery} from "@apollo/react-hooks";
import {getLayout} from "components/account/AccountLayout";
import {useTranslation} from "react-i18next";
import EditEmployeeHeader from 'components/employee/EditEmployeeHeader';

const AccountClubWorkersIndex = ({user}) => {
    const {query: {eid}} = useRouter();
    const {t, i18n} = useTranslation();
    const {data: {employee} = {}, loading, refetch} = useQuery(GET_EMPLOYEE, {
        variables: {
            id: eid
        }
    });

    if (loading) return <Loader/>;

    return employee && (
        <>
            <EditEmployeeHeader user={user} employee={employee} refetchEmployee={refetch}/>

            <EditEmployeeBox employee={employee}/>
        </>
    );
};

AccountClubWorkersIndex.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return {user};
};

AccountClubWorkersIndex.getLayout = getLayout;

export default AccountClubWorkersIndex;