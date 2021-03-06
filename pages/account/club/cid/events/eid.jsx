import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_EVENT, UPDATE_CLUB_EVENT} from "queries";
import EditEventBox from "components/account/club/EditEventBox";
import {useTranslation} from "react-i18next";
import { Loader } from "UI";

const AccountClubEventsEdit = () => {
    let {query: {eid}} = useRouter();
    eid = eid.replace('/', '');
    const [updateEvent] = useMutation(UPDATE_CLUB_EVENT);
    const {t, i18n} = useTranslation();

    const {data: {event} = {}, loading} = useQuery(GET_EVENT, {
        fetchPolicy: 'no-cache',
        variables: {
            id: eid
        }
    });
    const onSubmit = async variables => await updateEvent(variables);

    if (loading) {
        return <Loader/>;
    }

    return (
        <EditEventBox employees={event.club.employees} initialValues={{ ...event, event_type_id: +event.type.id }} onSubmit={onSubmit} />
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
