import React from "react";
import redirect from "lib/redirect";
import cx from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import SelectClub from "components/account/SelectClub";
import {Button, Tab, Panel, Loader} from "UI";
import {Tabs} from "@bumaga/tabs";
import {CalendarSvg} from "icons";
import {SCHEDULE_WEEK_PERIOD} from "queries";
import {
  GET_CLUB,
  CLUBS_SEARCH,
} from "queries";
import {useQuery} from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import Content from "UI/Popup/Content";
import Popup from "reactjs-popup";
import ContactsPopup from "components/popups/ContactsPupup";
import Calendar from "UI/Calendar";

const EmployeeCard = ({employee, clubs}) => {
  const [photo] = employee.photos;
  const {query: {cid}} = useRouter();
  const {t, i18n} = useTranslation();

  return (
    <div className="w-6/12 md:w-4/12 xl:w-3/12 px-2 mb-4">
      <div className="flex flex-col items-center px-3 py-2 border border-divider rounded-lg">
        <div className="relative w-30 h-30">
          <img className="w-30 h-30 rounded-full object-cover" src={photo && photo.thumb_url}
               alt={employee.name}/>
          <div className="absolute top-0 right-0">
            <Link href="/account/club/[cid]/workers/[eid]"
                  as={`/account/club/${cid}/workers/${employee.id}`}>
              <a className="flex items-center justify-center bg-white rounded-full w-10 h-10 z-10 cursor-pointer">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 16.2727C14.8075 16.2727 16.2727 14.8075 16.2727 13C16.2727 11.1925 14.8075 9.72727 13 9.72727C11.1925 9.72727 9.72727 11.1925 9.72727 13C9.72727 14.8075 11.1925 16.2727 13 16.2727Z"
                    stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path
                    d="M21.0727 16.2727C20.9275 16.6018 20.8842 16.9668 20.9484 17.3206C21.0125 17.6745 21.1812 18.0011 21.4327 18.2582L21.4982 18.3236C21.701 18.5263 21.862 18.7669 21.9718 19.0318C22.0816 19.2966 22.1381 19.5805 22.1381 19.8673C22.1381 20.154 22.0816 20.4379 21.9718 20.7028C21.862 20.9676 21.701 21.2083 21.4982 21.4109C21.2956 21.6138 21.0549 21.7747 20.7901 21.8845C20.5252 21.9943 20.2413 22.0508 19.9545 22.0508C19.6678 22.0508 19.3839 21.9943 19.119 21.8845C18.8542 21.7747 18.6135 21.6138 18.4109 21.4109L18.3455 21.3455C18.0884 21.094 17.7618 20.9253 17.4079 20.8611C17.054 20.7969 16.689 20.8402 16.36 20.9855C16.0373 21.1237 15.7622 21.3534 15.5683 21.646C15.3745 21.9387 15.2705 22.2817 15.2691 22.6327V22.8182C15.2691 23.3968 15.0392 23.9518 14.6301 24.361C14.2209 24.7701 13.6659 25 13.0873 25C12.5086 25 11.9537 24.7701 11.5445 24.361C11.1353 23.9518 10.9055 23.3968 10.9055 22.8182V22.72C10.897 22.3589 10.7801 22.0087 10.57 21.7149C10.3599 21.4212 10.0663 21.1974 9.72727 21.0727C9.39824 20.9275 9.03324 20.8842 8.67936 20.9484C8.32547 21.0125 7.99892 21.1812 7.74182 21.4327L7.67636 21.4982C7.47373 21.701 7.2331 21.862 6.96823 21.9718C6.70336 22.0816 6.41945 22.1381 6.13273 22.1381C5.846 22.1381 5.56209 22.0816 5.29722 21.9718C5.03235 21.862 4.79172 21.701 4.58909 21.4982C4.38623 21.2956 4.2253 21.0549 4.11551 20.7901C4.00571 20.5252 3.94919 20.2413 3.94919 19.9545C3.94919 19.6678 4.00571 19.3839 4.11551 19.119C4.2253 18.8542 4.38623 18.6135 4.58909 18.4109L4.65455 18.3455C4.90604 18.0884 5.07475 17.7618 5.13891 17.4079C5.20308 17.054 5.15976 16.689 5.01455 16.36C4.87626 16.0373 4.64664 15.7622 4.35396 15.5683C4.06128 15.3745 3.71831 15.2705 3.36727 15.2691H3.18182C2.60316 15.2691 2.04821 15.0392 1.63904 14.6301C1.22987 14.2209 1 13.6659 1 13.0873C1 12.5086 1.22987 11.9537 1.63904 11.5445C2.04821 11.1353 2.60316 10.9055 3.18182 10.9055H3.28C3.64108 10.897 3.99128 10.7801 4.28505 10.57C4.57883 10.3599 4.8026 10.0663 4.92727 9.72727C5.07249 9.39824 5.11581 9.03324 5.05164 8.67936C4.98748 8.32547 4.81877 7.99892 4.56727 7.74182L4.50182 7.67636C4.29896 7.47373 4.13803 7.2331 4.02823 6.96823C3.91843 6.70336 3.86192 6.41945 3.86192 6.13273C3.86192 5.846 3.91843 5.56209 4.02823 5.29722C4.13803 5.03235 4.29896 4.79172 4.50182 4.58909C4.70445 4.38623 4.94508 4.2253 5.20995 4.11551C5.47482 4.00571 5.75873 3.94919 6.04545 3.94919C6.33218 3.94919 6.61609 4.00571 6.88096 4.11551C7.14583 4.2253 7.38646 4.38623 7.58909 4.58909L7.65455 4.65455C7.91165 4.90604 8.2382 5.07475 8.59209 5.13891C8.94597 5.20308 9.31096 5.15976 9.64 5.01455H9.72727C10.0499 4.87626 10.3251 4.64664 10.5189 4.35396C10.7128 4.06128 10.8168 3.71831 10.8182 3.36727V3.18182C10.8182 2.60316 11.0481 2.04821 11.4572 1.63904C11.8664 1.22987 12.4213 1 13 1C13.5787 1 14.1336 1.22987 14.5428 1.63904C14.9519 2.04821 15.1818 2.60316 15.1818 3.18182V3.28C15.1832 3.63104 15.2872 3.97401 15.4811 4.26669C15.6749 4.55937 15.9501 4.78899 16.2727 4.92727C16.6018 5.07249 16.9668 5.11581 17.3206 5.05164C17.6745 4.98748 18.0011 4.81877 18.2582 4.56727L18.3236 4.50182C18.5263 4.29896 18.7669 4.13803 19.0318 4.02823C19.2966 3.91843 19.5805 3.86192 19.8673 3.86192C20.154 3.86192 20.4379 3.91843 20.7028 4.02823C20.9676 4.13803 21.2083 4.29896 21.4109 4.50182C21.6138 4.70445 21.7747 4.94508 21.8845 5.20995C21.9943 5.47482 22.0508 5.75873 22.0508 6.04545C22.0508 6.33218 21.9943 6.61609 21.8845 6.88096C21.7747 7.14583 21.6138 7.38646 21.4109 7.58909L21.3455 7.65455C21.094 7.91165 20.9253 8.2382 20.8611 8.59209C20.7969 8.94597 20.8402 9.31096 20.9855 9.64V9.72727C21.1237 10.0499 21.3534 10.3251 21.646 10.5189C21.9387 10.7128 22.2817 10.8168 22.6327 10.8182H22.8182C23.3968 10.8182 23.9518 11.0481 24.361 11.4572C24.7701 11.8664 25 12.4213 25 13C25 13.5787 24.7701 14.1336 24.361 14.5428C23.9518 14.9519 23.3968 15.1818 22.8182 15.1818H22.72C22.369 15.1832 22.026 15.2872 21.7333 15.4811C21.4406 15.6749 21.211 15.9501 21.0727 16.2727Z"
                    stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Link>
          </div>
          {employee.isVip && (
            <div className="absolute bottom-0 left-0 w-full">
              <div className="-mb-0-35 mx-auto bg-red rounded-full w-12 text-center text-white">{t('status.vip')}</div>
            </div>
          )}
        </div>
        <div className="text-center text-lg font-medium mt-4"
             style={{width: "min-content", display: "table-caption"}}>{employee.name}</div>
        <div className="flex items-center text-grey my-2">
          <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"/>
          <div className="flex items-center">05.06-07.06</div>
        </div>

        <SelectClub owner={employee.owner} employee={employee} clubs={clubs}/>

        <div className="flex flex-col items-center mt-2">
          <div>1234 {t('account.views')}</div>
          <div className="text-grey">{t('account.day_left', {days: 5})}</div>
        </div>
      </div>
    </div>
  )
};

const AvailableToday = ({employees, clubs}) => {
  const {t, i18n} = useTranslation();
  return (
    <>
      <div className="text-4xl font-extrabold mb-2">{t('account.available_today')}</div>
      <div className="flex flex-wrap -mx-2">
        {employees.map((employee) => <EmployeeCard key={employee.id} employee={employee} clubs={clubs}/>)}
      </div>
    </>
  )
};

const CalendarWeek = () => {
  const {data: {schedule_period} = {}, loading} = useQuery(SCHEDULE_WEEK_PERIOD);

  if (loading) return <Loader/>;

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
              })}>{s.display_name.slice(0, 2)} (11)
              </div>
              {s.today && (<div className="text-sm">today</div>)}
            </div>
          </div>

        ))}
      </div>
    </div>
  )
};

const AccountClubWorkersShow = ({user}) => {
  const {query: {cid}} = useRouter();
  const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
    variables: {
      id: cid
    }
  });
  const {loadingClubs, data: {clubsSearch} = {}, refetch} = useQuery(CLUBS_SEARCH, {
    variables: {
      filters: {
        // search: '',
      }
    }
  });

  const {t, i18n} = useTranslation();

  if (loading || loadingClubs) return <Loader/>;

  const clubs = clubsSearch.map(c => ({value: `${c.id}`, label: c.name}));

  return (
    <>
      <div className="flex items-center justify-between px-4 py-12">

        {/*<Popup*/}
        {/*    modal*/}
        {/*    closeOnDocumentClick*/}
        {/*    open={true}*/}

        {/*>*/}
        {/*    <Content*/}
        {/*        title='Calendar'>*/}
        {/*        /!*<Calendar/>*!/*/}
        {/*    </Content>*/}
        {/*</Popup>*/}

        <h1 className="text-4-65xl font-extrabold">
          {t('account.workers_cards')}
        </h1>

        <Button className="px-4" level="primary" outline size="sm">
          <div className="flex items-center">
            <CalendarSvg className="hover:text-white"/>
            <span className="text-black ml-2">{t('account.open_calendar')}</span>
          </div>
        </Button>
      </div>

      <CalendarWeek/>

      <Tabs>
        <div className="px-4 pt-12">
          <Tab>{t('account.all_workers')}</Tab>
          <Tab>{t('account.available_today')}</Tab>
          <Tab>{t('account.cooming_soon')}</Tab>
          <Tab>{t('common.not_active')}</Tab>
        </div>

        <div className="border-t border-divider"/>

        <Panel>
          <AvailableToday employees={club.employees} clubs={clubs}/>
        </Panel>
        <Panel>
          <AvailableToday employees={club.employees} clubs={clubs}/>
        </Panel>
        <Panel>
          <div className="text-4xl font-extrabold mb-2">{t('account.cooming_soon')}</div>
        </Panel>
        <Panel>
          <div className="text-4xl font-extrabold mb-2">{t('account.not_active')}</div>
        </Panel>
      </Tabs>
    </>)
};

AccountClubWorkersShow.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return {user};
};

AccountClubWorkersShow.getLayout = getLayout;

export default AccountClubWorkersShow;
