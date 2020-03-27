import React from "react";
import Link from "next/link";

import {Header, Footer} from "UI";
import {ArrowNextSvg} from "icons";
import GirlsBox from "components/homepage/GirlsBox";
import EventsBox from "components/homepage/EventsBox";
import ClubsBox from "components/homepage/ClubsBox";

import checkLoggedIn from "lib/checkLoggedIn";
import {useTranslation} from "react-i18next";

const Animation = () => (
    <div className="animation-gradient absolute top-0 left-0 w-full h-screen">
        <img
            className="hidden md:block animation-background__angle mb-0"
            src="/static/img/angle.svg"
        />
        <img
            className="hidden lg:block absolute top-0 right-0"
            src="/static/img/snake.svg"
        />
    </div>
);

const EventsContainer = () => {
    const { t, i18n } = useTranslation();

    return (
      <div className="container mx-auto relative z-10 overflow-hidden">
          <div className="flex flex-col xl:flex-row">
              <div className="flex flex-col md:flex-row xl:flex-col">
                  <div className="block text-white pl-1 pt-1 sm:pl-4 sm:pt-1 md:pl-8 xl:pl-0 xl:pt-1">
                      <div
                        className="block relative -mt-4 z-10 font-extrabold uppercase tracking-tighter leading-tight text-4-65xl sm:text-5-75xl md:text-6-5xl xl:text-7xl">
                          <div className="block company-item__div-name">{t('index.intimate')}</div>
                          <div className="block company-item__div-name ml-15 -mt-4 sm:ml-20 sm:-mt-6 md:ml-26 md:-mt-8 xl:-mt-10">
                              {t('index.services')}
                          </div>
                      </div>
                      <div
                        className="flex items-center font-medium tracking-tighter whitespace-no-wrap text-4xl -mt-6 sm:text-5xl sm:-mt-8 md:text-5-5xl md:-mt-8 xl:text-6xl xl:-mt-10">
                          <div className="block company-item__div-name mr-5 md:mr-6">{t('index.of_switzerland')}</div>
                          <div className="block company-item__div-ellipse header-red-ellipse md:-mt-1">№1</div>
                      </div>
                  </div>
                  <div
                    className="flex flex-wrap mt-2 sm:mt-3 sm:justify-between md:flex-col md:ml-12 md:mt-5 lg:ml-24 xl:flex-row xl:justify-start xl:ml-0 xl:mt-3">
                      <div
                        className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16 hover:cursor-pointer">
                          <a href="/girls">
                            <div className="block text-white font-extrabold text-2xl">
                              11 243
                            </div>
                            <div className="flex text-white text-xl">
                              <div className="w-9 border-t border-yellow mr-3 mt-3" />
                              {t('common.girls')}
                            </div>
                            </a>
                      </div>
                      <div
                        className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16 hover:cursor-pointer">
                            <a href="/clubs">
                            <div className="block text-white font-extrabold text-2xl">
                              350
                            </div>
                            <div className="flex text-white text-xl">
                              <div className="w-9 border-t border-yellow mr-3 mt-3" />
                              {t('common.clubs')}
                            </div>
                            </a>
                      </div>
                      <div
                        className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16 hover:cursor-pointer">
                            <a href="/events">
                                <div className="block text-white font-extrabold text-2xl">23</div>
                                <div className="flex text-white text-xl">
                                  <div className="w-9 border-t border-yellow mr-3 mt-3" />
                                  {t('common.events')} {t('common.today')}
                                </div>
                            </a>
                      </div>
                  </div>
              </div>
              <div className="relative md:mt-2 xl:flex xl:self-end xl:mb-6 xl:mt-2 xl:flex-col xl:ml-10 hd:ml-42">
                  <div className="flex text-white items-end leading-none">
                      <div className="text-4xl font-extrabold tracking-tighter">
                          {t('index.fresh_events')}
                      </div>
                      <Link href="/events">
                          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
                              <ArrowNextSvg>
                                  <span className="mr-1">{t('common.all_events')}</span>
                              </ArrowNextSvg>
                          </a>
                      </Link>
                  </div>
                  <div className="mt-7">
                      <EventsBox/>
                  </div>
              </div>
          </div>
      </div>
    );
};


const Index = ({ user }) => {
    const { t, i18n } = useTranslation();

    return (
      <>
          <Header
            user={user}
            animation={<Animation/>}
            hero={<EventsContainer/>}
          />
          <main className="relative z-10 mt-10 xl:mt-12-5">
              <div className="index-bg-bottom"/>
              <div className="container">
                  <div className="flex text-black items-end leading-none text-black md:text-white">
                      <div className="text-4xl font-extrabold tracking-tighter capitalize">
                          {t('common.girls')}
                      </div>
                      <Link href="/girls">
                          <a className="block text-sm whitespace-no-wrap transition ml-4 hover:text-red">
                              <ArrowNextSvg stroke="#fff">
                                  <span className="mr-1">{t('common.all_girls')}</span>
                              </ArrowNextSvg>
                          </a>
                      </Link>
                  </div>
                  <GirlsBox/>

                  <div className="flex text-black items-end leading-none mt-8">
                      <div className="text-4xl font-extrabold tracking-tighter">
                          {t('common.best_clubs')}
                      </div>
                      <Link href="/clubs">
                          <a className="block text-sm whitespace-no-wrap transition ml-4">
                              <ArrowNextSvg>
                                  <span className="mr-1">{t('common.all_clubs')}</span>
                              </ArrowNextSvg>
                          </a>
                      </Link>
                  </div>
                  <ClubsBox/>
              </div>
          </main>

          <Footer user={user}/>
      </>
    );
};

Index.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);

    if (!user) {
        return [];
    }
    return {user};
};

Index.getLayout = (page) => page;

export default Index;
