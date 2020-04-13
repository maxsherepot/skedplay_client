import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {EditEmployeeBox} from "components/employee";
import SelectClub from "components/account/SelectClub";
import {Button, DeletePopup, Loader} from "UI";
import {
    GET_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
} from "queries";
import StepBox from "components/StepBox";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {getLayout} from "components/account/AccountLayout";
import {useTranslation} from "react-i18next";
import {getErrors} from "utils/index";


const Header = ({employee}) => {
    const router = useRouter();
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
    const [photo] = employee.photos;
    const {t, i18n} = useTranslation();

    const handleDelete = () => {
        try {
            deleteEmployee({
                variables: {
                    employee: employee.id
                }
            });

            router.back();
        } catch (e) {
            return {
                status: false,
                message: t('errors.server_error')
            };
        }
    };

    const handleAddToGeneral = async () => {
        try {
            const {
                data: {
                    updateEmployee: {status, message}
                }
            } = await updateEmployee( {
                variables: {
                    employee: employee.id,
                    input: {
                        inGeneral: !employee.inGeneral,
                    }
                }
            });

            if (status) {
                router.reload();
            }
            return {
                status,
                message
            };
        } catch (e) {
            const errors = getErrors(e);

            return {
                status: false,
                message: "Server error",
                errors
            };
        }
    };

    const handleIsVip = async () => {
        try {
            const {
                data: {
                    updateEmployee: {status, message}
                }
            } = await updateEmployee( {
                variables: {
                    employee: employee.id,
                    input: {
                        isVip: !employee.isVip,
                    }
                }
            });

            if (status) {
                router.reload();
            }
            return {
                status,
                message
            };
        } catch (e) {
            const errors = getErrors(e);

            return {
                status: false,
                message: "Server error",
                errors
            };
        }
    };

    return (
        <div className="flex items-center justify-between border border-divider p-3 mx-8 mt-6 rounded-lg">
            <div className="relative w-30 h-30 mr-4">
                <img className="w-30 h-30 rounded-full object-cover" src={photo && photo.thumb_url}
                     alt={employee.name}/>
                {employee.isVip && (
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className="-mb-0-35 mx-auto bg-red rounded-full w-12 text-center text-white">{t('status.vip')}</div>
                    </div>
                )}
            </div>

            <div className="flex flex-1 px-2">
                <div className="flex w-full items-end -mx-2">
                    <div className="flex flex-col flex-1 px-2">
                        <div className="text-4xl font-extrabold whitespace-no-wrap">{employee.name}</div>
                        <div className="flex items-center text-grey my-2">
                            <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"/>
                            <div className="flex items-center">05.06-07.06</div>
                        </div>

                        <div className="flex items-center">
                            <SelectClub className="w-40" owner={employee.owner}/>

                            <div className="mx-4">{t('account.count_views', {count: 1234})}</div>

                            <div className="text-grey">{t('account.day_left', {days: 5})}</div>
                        </div>
                    </div>

                    <div className="flex justify-center flex-col h-full px-2">
                        <Button onClick={handleIsVip} className="px-3 mb-3" level="primary" outline size="xxs">
                            {employee.isVip ? (
                                <span className="text-black">{t('account.cancel_vip')}</span>
                            ) : (
                                <span className="text-black">{t('account.make_vip')}</span>
                            )}
                        </Button>
                        <Button className="px-3 mb-3" level="primary" outline size="xxs">
                            <span className="text-black">{t('account.deactivate')}</span>
                        </Button>
                        {employee.isVip && (
                            <Button onClick={handleAddToGeneral} className="px-3 mb-3" level="primary" outline size="xxs">
                                {employee.inGeneral ? (
                                    <span className="text-black">
                                        {t('account.only_for_exist_user')}
                                    </span>
                                ) : (
                                    <span className="text-black">
                                        {t('account.available_for_all')}
                                    </span>
                                )}
                            </Button>
                        )}

                        <DeletePopup onEnter={handleDelete} title={`${t('act.delete')} ${employee.name}?`}>
                            <div className="pt-6">
                                <p>{t('account.sure_delete_card')}</p>
                            </div>
                        </DeletePopup>
                    </div>
                </div>
            </div>
        </div>
    )
};

const AccountClubWorkersIndex = ({user}) => {
    const {query: {eid}} = useRouter();
    const {t, i18n} = useTranslation();
    const {data: {employee} = {}, loading} = useQuery(GET_EMPLOYEE, {
        variables: {
            id: eid
        }
    });

    const links = [
        t('account.links.information'),
        t('account.links.services_and_prices'),
        t('account.links.photos_and_videos'),
        t('account.links.schedule_and_activation'),
    ];

    if (loading) return <Loader/>;

    return employee && (
        <>
            <Header employee={employee}/>
            <div className="flex flex-col lg:flex-row justify-between">
                <StepBox links={links}/>
            </div>

            <div className="border-b border-divider"/>

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