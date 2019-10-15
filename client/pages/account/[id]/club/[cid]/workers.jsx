import React, { useState } from "react";
import redirect from "lib/redirect";
import cx from "classnames";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import { AccountBox } from "components/account";
import { Button, Tab, Panel } from "UI";
import { Tabs } from "@bumaga/tabs";
import { CalendarSvg } from "icons";
import { SCHEDULE_WEEK_PERIOD } from "queries";
import {
    GET_CLUB,
} from "queries";
import { useQuery } from "@apollo/react-hooks";

const EmployeeCard = () => {
    return (
        <div>Card</div>
    )
};

const AvailableToday = ({ employees }) => {
    console.log(employees)
    return (
        <div className="px-2">
            <div className="flex flex-wrap -mx-2">
                {employees.map((employee) =>)}
            </div>
        </div>
    )
};

const CalendarWeek = () => {
    const { data: { schedule_period } = {}, loading } = useQuery(SCHEDULE_WEEK_PERIOD);

    if (loading) return null;

    return (
      <div className="px-2 mt-4">
          <div className="flex items-center justify-around -mx-2">
              {schedule_period.map((s, i) => (
                  <div className={cx("flex w-20 h-24 px-2 flex-col border border-divider rounded-lg", {
                      "bg-light-grey": s.today
                  })} key={i}>
                      <div className="text-center">
                          <div className={cx("text-black text-lg mt-2", {
                              "text-light-grey": !s.today
                          })}>{s.date}</div>
                          <div className={cx("text-sm text-grey my-1", {
                              "text-light-grey": !s.today
                          })}>{s.display_name.slice(0, 2)} (11)</div>
                          {s.today && (<div className="text-sm">today</div>)}
                      </div>
                  </div>

              ))}
          </div>
      </div>
    )
}

const AccountWorkers = ({ loggedInUser }) => {
    const { query: { cid } } = useRouter();
    const { data: { club } = {}, loading} = useQuery(GET_CLUB, {
        variables: {
            id: cid
        }
    });
    const [collapse, setCollapse] = useState(0);

    if (loading) return null;

    return <AccountBox contentClass="lg:w-3/5" user={loggedInUser} collapse={collapse} setCollapse={setCollapse}>
        <div className="flex items-center justify-between px-8 py-12">
            <h1 className="text-4-65xl font-extrabold">
                Sex workers cards
            </h1>

            <Button className="px-4" level="primary" outline size="sm">
                <div className="flex items-center">
                    <CalendarSvg className="hover:text-white" />
                    <span className="text-black ml-2">Open calendar</span>
                </div>
            </Button>
        </div>

        <CalendarWeek />

        <Tabs>
            <div className="px-8 pt-12">
                <Tab>All workers</Tab>
                <Tab>Available today</Tab>
                <Tab>Cooming soon</Tab>
                <Tab>Not active</Tab>
            </div>

            <div className="border-t border-divider" />

            <Panel>
                <div className="text-4xl font-extrabold">Available today</div>

                <AvailableToday employees={club.employees} />
            </Panel>
            <Panel>Panel 2</Panel>
            <Panel>Panel 3</Panel>
            <Panel>Panel 4</Panel>
        </Tabs>

    </AccountBox>;
};

AccountWorkers.getInitialProps = async context => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    if (!loggedInUser) {
        redirect(context, "/login");
    }

    return { loggedInUser };
};

export default AccountWorkers;
