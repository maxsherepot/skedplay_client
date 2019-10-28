import React, { useState } from "react";
import Link from "next/link";
import cx from "classnames";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import { VisaSvg, PayPalSvg, PostFinanceSvg, TwintSvg, SmsSvg, InvoiceSvg } from "icons"
import {
  AnimationBackground,
  Logo,
  ArrowBack,
  LangSelector,
  GroupRadio
} from "UI";
import PlansBox from "components/plans/PlansBox";

const PaymentMethod = () => {
  const [payment, setPayment] = useState(0);

  const methods = [
    <VisaSvg />,
    <PayPalSvg />,
    <PostFinanceSvg />,
    <TwintSvg />,
    <SmsSvg />,
    <InvoiceSvg />
  ];

  return (
      <div className="flex flex-col">
        <div className="text-white text-center mt-6 mb-3">Select Payment Method</div>

        <div className="flex bg-white rounded-full">
          <div className="flex items-center justify-between rounded-full bg-white cursor-pointer p-1">
            {methods.map((method, i) => (
                <div key={i} className={cx("mx-1 p-4 rounded-full opacity-25 hover:bg-light-grey hover:opacity-100", {
                  "bg-light-grey opacity-100": payment === i
                })}
                onClick={() => setPayment(i)}
                >
                  {method}
                </div>
            ))}
          </div>
        </div>
      </div>
  )
};
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

  const [period, setPeriod] = useState(periods[0].value);

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
              <LangSelector className="text-white" />
            </div>
            <div className="text-white uppercase font-extrabold text-2xl text-center leading-none mt-10">
              Choose a plan and duration
            </div>

            <div className="flex justify-center mt-5">
              <GroupRadio
                name="plan"
                items={periods}
                defaultValue={period}
                handleChange={e => setPeriod(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-5">
              <PaymentMethod />
            </div>
          </div>
          <div className="container mt-8 mb-20">
            <PlansBox user={user} />
          </div>
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
