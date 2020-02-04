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
    const {t, i18n} = useTranslation();

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between">
                <StepBox links={links} />
            </div>
            <div className="border-b border-divider" />
            <EditClubBox club={club} user={user} />
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
