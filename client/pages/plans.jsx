import React, { useState } from "react";
import Link from 'components/SlashedLink'
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import {
  AnimationBackground,
  Logo,
  ArrowBack,
  LangSelector,
  Button,
  GroupRadio
} from "UI";
import PlansBox from "components/plans/PlansBox";
import { useTranslation } from "react-i18next";
import { GET_ME } from "queries/userQuery";
import { useQuery } from "@apollo/react-hooks";
import Loader from "UI/Loader";

const Plans = ({ user }) => {
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

  const { t, i18n } = useTranslation();

  if (loading) {
    return <Loader />
  }

  const YesButton = ({ link }) => {
    const { t, i18n } = useTranslation();

    return (
      <div className="mt-3 inline-block text-center">
        <Link href={link}>
          <Button
            className="w-20 text-xl min-w-full uppercase"
            type="submit"
            size="xs"
          >
            {t('after_register.yes')}
          </Button>
        </Link>
      </div>
    );
  };

  const NoButton = ({ link }) => {
    const { t, i18n } = useTranslation();

    return (
      <div className="ml-8 inline-block text-center">
        <Link href={link}>
          <Button
            className="w-20 text-xl min-w-full mt-3 uppercase"
            // level="primary-black"
            outline
            size="xs"
          >
            {t('after_register.no')}
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <>
      <AnimationBackground full />
      <div className="container mx-auto">
        <div className="flex items-center flex-col">
          <div className="w-full px-3 md:w-header-plans md:px-0 mt-6 sm:mt-12">
            <div className="relative flex justify-between items-center">
              <ArrowBack href="/register" color="white" />
              <div className="absolute top-0 left-0 h-full flex justify-center items-center w-full">
                <Link href="/">
                  <a className="block text-center w-2/4 sm:w-full">
                    <Logo />
                  </a>
                </Link>
              </div>
              <LangSelector black={false} />
            </div>

            {(me && me.is_club_owner) && (
              <div>
                <div className="text-white uppercase font-bold text-2xl text-center leading-none mt-10">
                  {t('after_register.welcome_for_club_owner', { name: `${me.name}` })}
                  <div className="row mt-5">
                    <div className="mt-3 inline-block text-center">
                      <Link href="/clubs/add">
                        <Button
                          className="w-20 text-xl min-w-full uppercase"
                          type="submit"
                          size="xs"
                        >
                          {t('after_register.add_club_button')}
                        </Button>
                      </Link>
                    </div>
                    {/* <NoButton link="/account"/> */}
                  </div>
                </div>
              </div>
            )}


            {(me && me.is_employee && me.employee) && (
              <div>
                <div className="text-white uppercase font-bold text-2xl text-center leading-none mt-10">
                  {t('after_register.welcome_for_employee', { name: `${me.employee.name}` })}
                  <div className="row mt-5">
                    <div className="mt-3 inline-block text-center">
                      <Link href="/account/ad">
                        <Button
                          className="w-20 text-xl min-w-full uppercase"
                          type="submit"
                          size="xs"
                        >
                          {t('after_register.add_employee_button')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(me && me.is_client) && (
              <div>
                <div className="text-white uppercase font-bold text-2xl text-center leading-none mt-10">
                  {t('after_register.welcome_for_client', { name: `${me.name}` })}
                  {/* <div className="row mt-5">
                     <YesButton link="/account" />
                    <NoButton link="/" /> 
                  </div>*/}
                </div>
              </div>
            )}

            {/*temporary hide section plans*/}
            {/*<div className="text-white uppercase font-bold text-2xl text-center leading-none mt-10">
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
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return { user };
};

Plans.getLayout = page => page;

export default Plans;
