import React, {useMemo} from "react";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink } from "UI";
import {useTranslation} from "react-i18next";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from 'components/SlashedLink'

const tabs = [
    {name: "layout.girls", link: "/favorites/girls"},
    {name: "favorite.clubs", link: "/favorites/clubs"},
    {name: "layout.events", link: "/favorites/events"}
]

const FavoriteBox = ({ user, children }) => {
  const {t, i18n} = useTranslation();
  const leftInfo = (
    <div className="hidden hd:block text-3xl font-extrabold hd:text-white">
      {t('layout.favorites')}
    </div>
  );

  const getSelectedTab = () => {
      let index = 0;
      const path = (global && global.location && global.location.pathname) || ""
      tabs.forEach((item, i) => {
          if (path.includes(item.link)) {
              index = i
          }
      });
      return index
  }

  const selectedTab = getSelectedTab()

  return (
      <MainLayout user={user}>
        <SecondaryNav left={leftInfo}>
                <Tabs
                  value={-1}
                  variant="scrollable"
                  scrollButtons="off"
                  disableRipple
                  aria-label="scrollable prevent tabs example"
                >
                {
                    tabs.map((tab, i) => {
                        return (
                            <Tab className="outline-none" label={(
                                <ActiveLink activeClassName="text-red" href={tab.link} as={tab.link}>
                                    <a>{t(tab.name)}</a>
                                </ActiveLink>
                            )}/>
                        )

                        return (
                            <Link key={i} href={tab.link}>
                                <Tab className="outline-none" label={t(tab.name)}/>
                            </Link>
                        )
                    })
                }
                </Tabs>
        </SecondaryNav>

        <div className="container">{children}</div>
      </MainLayout>
  )
  return (
    <MainLayout user={user}>
      <SecondaryNav left={leftInfo}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/girls">
              <a>{t('layout.girls')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/clubs">
              <a>{t('favorite.clubs')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/events">
              <a>{t('layout.events')}</a>
            </ActiveLink>
          </li>
        </ul>
      </SecondaryNav>

      <div className="container">{children}</div>
    </MainLayout>
  );
};

export default FavoriteBox;
