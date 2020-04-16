import React, {useState} from "react";
import Link from "next/link";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import {
    AnimationBackground,
    Logo,
    ArrowBack,
    LangSelector,
    GroupRadio
} from "UI";
import PlansBox from "components/plans/PlansBox";
import {useTranslation} from "react-i18next";
import {GET_ME} from "queries/userQuery";
import {useQuery} from "@apollo/react-hooks";
import Loader from "UI/Loader";

const Plans = ({user}) => {
    const periods = [
        {
            name: "3 months",
            value: "3"
        },
        {
            name: "6 months",
            value: "6"
        },
        {
            name: "1 year",
            value: "12"
        }
    ];
    const {
        data: { me } = {},
        loading
    } = useQuery(GET_ME);

    const [period, setPeriod] = useState(periods[0].value);

    const {t, i18n} = useTranslation();

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <AnimationBackground full/>
            <div className="container mx-auto">
                <div className="flex items-center flex-col">
                    <div className="w-full px-3 md:w-header-plans md:px-0 mt-6 sm:mt-12">
                        <div className="relative flex justify-between items-center">
                            <ArrowBack href="/register" color="white"/>
                            <div className="absolute top-0 left-0 h-full flex justify-center items-center w-full">
                                <Link href="/">
                                    <a className="block text-center w-2/4 sm:w-full">
                                        <Logo/>
                                    </a>
                                </Link>
                            </div>
                            <LangSelector className="text-white"/>
                        </div>

                        {(me && me.is_club_owner) && (
                            <div>
                                <div className="text-white uppercase font-extrabold text-2xl text-center leading-none mt-10">
                                    Welcome to our portal {me.name} do you want edit your Profile and Photos now?
                                    <div className="row mt-5">
                                        <div className="mt-3 text-white inline-block uppercase font-extrabold text-2xl text-center">
                                            <a href="/clubs/add">Yes</a>
                                        </div>
                                        <div className="ml-8 text-white inline-block uppercase font-extrabold text-2xl text-center">
                                            <a href="/account">No</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(me && me.is_employee && me.employee) && (
                            <div>
                                <div className="text-white uppercase font-extrabold text-2xl text-center leading-none mt-10">
                                    Welcome to our portal {me.employee.name} do you want edit your Profile and Photos now?
                                    <div className="row mt-5">
                                        <div className="mt-3 text-white inline-block uppercase font-extrabold text-2xl text-center">
                                            <a href="/account/ad">Yes</a>
                                        </div>
                                        <div className="ml-8 text-white inline-block uppercase font-extrabold text-2xl text-center">
                                            <a href="/account">No</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {(me && me.is_client) && (
                            <div>
                                <div className="text-white uppercase font-extrabold text-2xl text-center leading-none mt-10">
                                    Welcome to our portal {me.name} do you want to show your Profile ?
                                    <div className="row mt-5">
                                        <div className="mt-3 text-white inline-block uppercase font-extrabold text-2xl text-center">
                                            <a href="/account">Yes</a>
                                        </div>
                                        <div className="ml-8 text-white inline-block uppercase font-extrabold text-2xl text-center">
                                            <a href="/">No</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/*temporary hide section plans*/}
                        {/*<div className="text-white uppercase font-extrabold text-2xl text-center leading-none mt-10">
                            {t('plans.choose_plan')}
                        </div>

                        <div className="flex justify-center mt-5">
                            <GroupRadio
                                name="plan"
                                items={periods}
                                defaultValue={period}
                                handleChange={e => setPeriod(e.target.value)}
                            />
                        </div>*/}
                    </div>
                    {/*<div className="container mt-8 mb-20">
                        <PlansBox user={user}/>
                    </div>*/}
                </div>
            </div>
        </>
    );
};

Plans.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return {user};
};

Plans.getLayout = page => page;

export default Plans;
