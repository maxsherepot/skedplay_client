import React, { useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { PhoneSvg } from "icons";
import { MainLayout } from "layouts";
import { Subscribe, SecondaryNav, Button, ActiveLink, Breadcrumbs, Loader } from "UI";
import GirlsViewedBox from "components/employee/GirlsViewedBox";
import {useTranslation} from "react-i18next";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_PAGE, CREATE_SUBSCRIBE_EMPLOYEE, DO_EVENT} from 'queries';
import translation from "services/translation";
import {getErrors} from "utils/index";

const EmployeeBox = ({ employee, employees, user, viewed, children, lastBreadcrumbs, showNavLinks, noName }) => {
  const [showNumber, setToggleNumber] = useState(false);
  const {t, i18n} = useTranslation();
  const { asPath } = useRouter();

  const [createSubscribeEmployee] = useMutation(CREATE_SUBSCRIBE_EMPLOYEE);
  const [doEvent] = useMutation(DO_EVENT);
  const [isSubscribed, setIsSubscribed] = useState(false)


  const girlType = parseInt(employee.type) === 1
    ? 'girls'
    : 'trans';

  const { data: { page } = {}, loading: pageLoading} = useQuery(GET_PAGE, {
    variables: {
      key: girlType
    }
  });

  if (pageLoading) {
    return <Loader/>
  }

  const cityFilter = process.env.CITY_FILTER !== 'true'
    ? []
    : [
      {
        as: `/${girlType}/${employee.city.canton.slug}/${employee.city.slug}`,
        href: `/${girlType}/canton/city?canton=${employee.city.canton.slug}&city=${employee.city.slug}`,
        label: employee.city.name
      }
    ];

  let breadcrumbs = [
    {
      as: `/${girlType}`,
      href: `/${girlType}`,
      label: translation.getLangField(page.header, i18n.language)
    },
    employee.city && employee.canton ?
    {
      as: `/${girlType}/${employee.city.canton.slug}`,
      href: `/${girlType}/canton?&canton=${employee.city.canton.slug}`,
      label: employee.city.canton.name
    } : {},
    ...cityFilter,
    employee.city && employee.canton ?
    {
      as: `/${girlType}/${employee.city.canton.slug}/${employee.city.slug}/${employee.id}/information`,
      href: `/${girlType}/canton/city/id/information?id=${employee.id}&canton=${employee.city.canton.slug}&city=${employee.city.slug}`,
      label: employee.name
    } : {
      as: `/employees/${employee.id}/information`,
      href: `/employees/id/information?id=${employee.id}`,
      label: employee.name
    },
  ];

  if (lastBreadcrumbs) {
    breadcrumbs = [...breadcrumbs, ...lastBreadcrumbs]
  }

  const getHref = (page) => {
    if (!employee.city || !employee.city.canton) {
      return `/employees/id/${page}?id=${employee.id}`;
    }

    return `/${girlType}/canton/city/id/${page}?id=${employee.id}&canton=${employee.city.canton.slug}&city=${employee.city.slug}`;
  };

  const getAs = (page) => {
    if (!employee.city || !employee.city.canton) {
      return `/employees/${employee.id}/${page}`;
    }

    return `/${girlType}/${employee.city.canton.slug}/${employee.city.slug}/${employee.id}/${page}`;
  };


  let leftInfo = (
    <>
      <div className={"flex flex-col md:flex-row items-center mt-4 sm:mt-0 mb-4 xl:mt-4 " + (noName ? "hidden" : "")}>
        {employee && (
          <h1 className="text-xl font-bold flex items-center">
            {employee.name}, {employee.age} <div className="inline-block sm:hidden bg-dark-green rounded-full w-2 h-2 ml-2"></div>
          </h1>
        )}
        <Button
          className="ml-0 sm:ml-4 uppercase hidden sm:block"
          size="xxs"
          level="success"
          weight="normal"
        >
          {t('employees.available')}
        </Button>
      </div>
    </>
  );
  if (asPath.includes("/chat")) {
      leftInfo = null
  }

  // const phone = employee.phone || employee.owner.phone;

  // const rightInfo = phone ? (
  //   <div className="flex items-center justify-center bg-red text-white px-8 py-3 rounded-full cursor-pointer">
  //     <PhoneSvg/>
  //     <span
  //       className={cx("block ml-2 whitespace-no-wrap overflow-hidden", {
  //         "w-10": !showNumber
  //       })}
  //     >
  //       {phone}
  //     </span>
  //     {!showNumber && (
  //       <span
  //         className="ml-4 whitespace-no-wrap"
  //         onClick={() => setToggleNumber(!showNumber)}
  //       >
  //           {t('employees.show_phone')}
  //       </span>
  //     )}
  //   </div>
  // ) : null;

  const rightInfo = null;


  const handleSubscribe = async values => {
    try {
      const {
        data: {
          createSubscribeEmployee: {status, message}
        }
      } = await createSubscribeEmployee({
        variables: {
          email: values.email,
          employee_id: employee.id,
          locale: i18n.language
        }
      });

      setIsSubscribed(status)

      doEvent({
        variables: {
          model_type: 'employee',
          model_id: employee.id,
          event: 'subscribe',
        }
      });

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
    <MainLayout user={user}>
      <SecondaryNav
        left={leftInfo}
        right={rightInfo}
        breadcrumbs={
            <div className="hidden sm:block">
                <Breadcrumbs
                  items={breadcrumbs}
                />
            </div>
        }
      >
        {showNavLinks &&
            <div className="">
                <Tabs
                  value={-1}
                  variant="scrollable"
                  scrollButtons="off"
                  aria-label="scrollable prevent tabs example"
                >
                {
                    tabs.map((tab, i) => {
                        let advancedBlock = undefined
                        if (tab.link === "reviews") {
                            advancedBlock = (
                                <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-sm ml-1">
                                    {(employee.reviews && employee.reviews.length) || 0}
                                  </span>
                            )
                        } else if (tab.link === "chat") {
                            advancedBlock = (
                                <>
                                  {employee.user_unread_messages_count > 0 &&
                                  <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-sm ml-1">
                                        +{employee.user_unread_messages_count}
                                      </span>
                                  }
                                </>
                            )
                        }
                        return (
                                <Tab key={i} className="outline-none" label={(
                                    <ActiveLink
                                      activeClassName="text-black"
                                      href={getHref(tab.link)}
                                      as={getAs(tab.link)}
                                      advancedBlock={advancedBlock}
                                    >
                                      <a>{t(tab.name)}</a>
                                    </ActiveLink>
                                )}/>
                        )
                    })
                }
                </Tabs>
            </div>
        }
      </SecondaryNav>

      <div className="container">
        {children}
        {(viewed && employees.length > 0) &&
          <GirlsViewedBox employees={employees} user={user}/>
        }
      </div>
      <div>
        <Subscribe isSubscribed={isSubscribed} onSubmit={handleSubscribe} text="Subscribe for Updates and Keep track of all things from this Worker" imageUrl="/static/img/subscribe-girl.png"/>
      </div>
    </MainLayout>
  );
};

{/*
    <ul className="flex -mx-4 text-white">
      <ActiveLink
        activeClassName="text-black"
        href={getHref('information')}
        as={getAs('information')}
      >
        <a>{t('account.links.information')}</a>
      </ActiveLink>

      <ActiveLink
        activeClassName="text-black"
        href={getHref('events')}
        as={getAs('events')}
      >
        <a>{t('employees.events')}</a>
      </ActiveLink>

      <ActiveLink
        activeClassName="text-black"
        href={getHref('reviews')}
        as={getAs('reviews')}
        advancedBlock={
          <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-sm ml-1">
              {(employee.reviews && employee.reviews.length) || 0}
            </span>
        }
      >
        <a>{t('common.reviews')}</a>
      </ActiveLink>

      <ActiveLink
        activeClassName="text-black"
        href={getHref('chat')}
        as={getAs('chat')}
        advancedBlock={
          <>
            {employee.user_unread_messages_count > 0 &&
            <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-sm ml-1">
                  +{employee.user_unread_messages_count}
                </span>
            }
          </>
        }
      >
        <a>{t('employees.chat')}</a>
      </ActiveLink>
    </ul>
*/}

const tabs = [
    {name: "account.links.information", link: "information"},
    {name: "employees.events", link: "events"},
    {name: "common.reviews", link: "reviews"},
    {name: "employees.chat", link: "chat"}
]

EmployeeBox.defaultProps = {
  viewed: true,
  showNavLinks: true,
};

export default EmployeeBox;
