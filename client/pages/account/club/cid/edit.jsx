import React from "react";
import redirect from "lib/redirect";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import { EditClubBox } from "components/club";
import {
    GET_CLUB,
} from "queries";
import { useQuery } from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import { Loader, Breadcrumbs } from "UI";
import Link from 'components/SlashedLink'
import ArrowBack from "UI/ArrowBack";

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

    const Breadcrumbs = () => (
        <div className="container">
            <div className="flex items-center py-4">
                <ArrowBack back />
                <div className="ml-10 hidden sm:block">
                    <Link href="/account">
                        <a className="text-red hover:text-pink">{t('account.my_club')}</a>
                    </Link>
                    <span className="px-2 text-grey">/</span>
                    {club.name}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <Breadcrumbs />
            <div className="bg-white shadow rounded-lg p-8">
                <EditClubBox club={club} user={user} refetchClub={refetch} />
            </div>
        </div>
    );
};

//AccountClubEdit.getLayout = getLayout;

AccountClubEdit.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return { user };
};

export default AccountClubEdit;
