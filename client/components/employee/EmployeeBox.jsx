import React, { useState } from "react";
import cx from "classnames";
import { PhoneSvg } from "icons";
import { MainLayout } from "layouts";
import { SecondaryNav, Button, ActiveLink, Breadcrumbs, Loader } from "UI";
import GirlsViewedBox from "components/employee/GirlsViewedBox";
import {useTranslation} from "react-i18next";
import slug from "slug";
import {useQuery} from "@apollo/react-hooks";
import {GET_PAGE} from 'queries';
import translation from "services/translation";

const EmployeeBox = ({ employee, employees, user, viewed, children, lastBreadcrumbs }) => {
  const [showNumber, setToggleNumber] = useState(false);
  const {t, i18n} = useTranslation();

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
        as: `/${girlType}/${slug(employee.city.canton.name)}/${slug(employee.city.name)}`,
        href: `/${girlType}/canton/city?canton=${slug(employee.city.canton.name)}&city=${slug(employee.city.name)}`,
        label: employee.city.name
      }
    ];

  let breadcrumbs = [
    {
      as: `/${girlType}`,
      href: `/${girlType}`,
      label: translation.getLangField(page.header, i18n.language)
    },
    {
      as: `/${girlType}/${slug(employee.city.canton.name)}`,
      href: `/${girlType}/canton?&canton=${slug(employee.city.canton.name)}`,
      label: employee.city.canton.name
    },
      ...cityFilter,
    {
      as: `/${girlType}/${slug(employee.city.canton.name)}/${slug(employee.city.name)}/${employee.id}/information`,
      href: `/${girlType}/canton/city/id/information?id=${employee.id}&canton=${slug(employee.city.canton.name)}&city=${slug(employee.city.name)}`,
      label: employee.name
    },
  ];

  if (lastBreadcrumbs) {
    breadcrumbs = [...breadcrumbs, ...lastBreadcrumbs]
  }

  const getHref = (page) => {
    if (!employee.city || !employee.city.canton) {
      return `/employees/id/information?id=${employee.id}`;
    }

    return `/${girlType}/canton/city/id/${page}?id=${employee.id}&canton=${slug(employee.city.canton.name)}&city=${slug(employee.city.name)}`;
  };

  const getAs = (page) => {
    if (!employee.city || !employee.city.canton) {
      return `/employees/${employee.id}/information`;
    }

    return `/${girlType}/${slug(employee.city.canton.name)}/${slug(employee.city.name)}/${employee.id}/${page}`;
  };

  const leftInfo = (
    <>
      <div className="flex flex-col md:flex-row items-center mb-4 md:mt-4">
        {employee && (
          <h1 className="text-3xl font-extrabold hd:text-white">
            {employee.name} {employee.age}
          </h1>
        )}
        <Button
          className="ml-4 uppercase"
          size="xxs"
          level="success"
          weight="normal"
        >
          {t('employees.available')}
        </Button>
      </div>
    </>
  );

  const phone = employee.phone || employee.owner.phone;

  const rightInfo = phone ? (
    <div className="flex items-center justify-center bg-red text-white px-8 py-3 rounded-full cursor-pointer">
      <PhoneSvg/>
      <span
        className={cx("block ml-2 whitespace-no-wrap overflow-hidden", {
          "w-10": !showNumber
        })}
      >
        {phone}
      </span>
      {!showNumber && (
        <span
          className="ml-4 whitespace-no-wrap"
          onClick={() => setToggleNumber(!showNumber)}
        >
            {t('employees.show_phone')}
        </span>
      )}
    </div>
  ) : null;

  return (
    <MainLayout user={user}>
      <SecondaryNav
        left={leftInfo}
        right={rightInfo}
        breadcrumbs={
          <Breadcrumbs
            items={breadcrumbs}
          />
        }
      >
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={getHref('information')}
              as={getAs('information')}
            >
              <a>{t('account.links.information')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={getHref('events')}
              as={getAs('events')}
            >
              <a>{t('employees.events')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={getHref('reviews')}
              as={getAs('reviews')}
            >
              <a>{t('common.reviews')}</a>
            </ActiveLink>

            <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-xs ml-1">
              {(employee.reviews && employee.reviews.length) || 0}
            </span>
          </li>
            <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
              <ActiveLink
                activeClassName="text-red"
                href={getHref('chat')}
                as={getAs('chat')}
              >
                <a>{t('employees.chat')}</a>
              </ActiveLink>
              {employee.user_unread_messages_count > 0 &&
                <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-xs ml-1">
                  +{employee.user_unread_messages_count}
                </span>
              }
            </li>
        </ul>
      </SecondaryNav
      >

      <div className="fluid-container">
        {children}
        {viewed &&
          <GirlsViewedBox employees={employees}/>
        }
      </div>
    </MainLayout>
  );
};

EmployeeBox.defaultProps = {
  viewed: true
};

export default EmployeeBox;
