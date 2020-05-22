import React from "react";
import redirect from "lib/redirect";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import StepBox from "components/StepBox";
import { EditClubBox } from "components/club";
import {
    GET_CLUB,
} from "queries";
import { useQuery } from "@apollo/react-hooks";
import { getLayout } from "components/account/AccountLayout";
import {useTranslation} from "react-i18next";
import { Loader } from "UI";

const AccountClubEdit = ({ user }) => {
    let { query: { cid } } = useRouter();
    cid = cid.replace('/', '');
    const { data: { club } = {}, loading, refetch} = useQuery(GET_CLUB, {
        variables: {
            id: cid
        }
    });
    const {t, i18n} = useTranslation();


    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <EditClubBox club={club} user={user} refetchClub={refetch} />
        </>
    );
};

AccountClubEdit.getLayout = getLayout;

AccountClubEdit.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

export default AccountClubEdit;
