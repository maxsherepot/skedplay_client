import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_EVENT, GET_MY_EMPLOYEES, UPDATE_EMPLOYEE_EVENT} from "queries";
import EditEventBox from "components/account/club/EditEventBox";
import {useTranslation} from "react-i18next";
import { Loader } from "UI";

const AccountClubEventsEdit = () => {
    const {query: {eid}} = useRouter();
    const [updateEmployeeEvent] = useMutation(UPDATE_EMPLOYEE_EVENT);
    const {t, i18n} = useTranslation();

    const {data: {event} = {}, loading} = useQuery(GET_EVENT, {
        variables: {
            id: eid
        }
    });
    const onSubmit = async variables => await updateEmployeeEvent(variables);

    const {loading: employeesLoading, data} = useQuery(GET_MY_EMPLOYEES);

    const employees = (data && data.me && data.me.employees) || [];

    if (loading || employeesLoading) {
        return <Loader/>;
    }

    return (
        <EditEventBox employees={employees} initialValues={{ ...event, event_type_id: +event.type.id }} onSubmit={onSubmit} />
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
