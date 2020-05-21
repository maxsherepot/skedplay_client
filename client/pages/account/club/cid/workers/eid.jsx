import React, {useRef} from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {EditEmployeeBox} from "components/employee";
import {Loader} from "UI";
import {
    GET_EMPLOYEE,
} from "queries";
import Link from 'components/SlashedLink'
import ArrowBack from "UI/ArrowBack";
import {useMutation, useQuery} from "@apollo/react-hooks";
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

    const HeaderNavigation = () => (
        <div className="container">
            <div className="flex items-center py-4">
                <ArrowBack back />
                <div className="ml-10">
                    <Link href="/account">
                        <a className="text-red hover:text-pink">{t('account.my_account')}</a>
                    </Link>
                    <span className="px-2 text-grey">/</span>
                    {t('common.edit')}
                    <span className="px-2 text-grey">/</span>
                    {employee.first_name} {employee.last_name}
                </div>
            </div>
        </div>
    );

    const classNames = 'flex items-center flex-wrap justify-center hd:justify-around w-3/6 text-center xl:flex-no-wrap border border-divider p-3 mx-auto mt-6 rounded-lg';
    if (loading) return <Loader/>;

    return employee && (
        <>
            <div className="container">
                <HeaderNavigation/>
                <div className="bg-white shadow rounded-lg p-8">
                    <EditEmployeeHeader user={user} employee={employee} refetchEmployee={refetch} classes={classNames}/>
                    <EditEmployeeBox employee={employee} refetchEmployee={refetch}/>
                </div>
            </div>
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

export default AccountClubWorkersIndex;