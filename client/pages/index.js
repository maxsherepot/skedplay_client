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
                  <div className="block text-white pl-1 pt-7 sm:pl-4 sm:pt-8 md:pl-8 xl:pl-0 xl:pt-22">
                      <div
                        className="block relative z-10 font-extrabold uppercase tracking-tighter leading-tight text-4-65xl sm:text-5-75xl md:text-6-5xl xl:text-7xl">
                          <div className="block">{t('index.intimate')}</div>
                          <div className="block ml-15 -mt-4 sm:ml-20 sm:-mt-6 md:ml-26 md:-mt-8 xl:-mt-10">
                              {t('index.services')}
                          </div>
                      </div>
                      <div
                        className="flex items-center font-medium tracking-tighter whitespace-no-wrap text-4xl -mt-6 sm:text-5xl sm:-mt-8 md:text-5-5xl md:-mt-8 xl:text-6xl xl:-mt-10">
                          <div className="block mr-5 md:mr-6">{t('index.of_switzerland')}</div>
                          <div className="block header-red-ellipse md:-mt-1">№1</div>
                      </div>
                  </div>
                  <div
                    className="flex flex-wrap mt-6 sm:mt-10 sm:justify-between md:flex-col md:ml-12 md:mt-12 lg:ml-24 xl:flex-row xl:justify-start xl:ml-0 xl:mt-16">
                      <div
                        className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16">
                          <div className="block text-white font-extrabold text-2xl">
                              11 243
                          </div>
                          <div className="flex text-white text-xl">
                              <div className="w-9 border-t border-yellow mr-3 mt-3" />
                              girls
                          </div>
                      </div>
                      <div
                        className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16">
                          <div className="block text-white font-extrabold text-2xl">
                              350
                          </div>
                          <div className="flex text-white text-xl">
                              <div className="w-9 border-t border-yellow mr-3 mt-3" />
                              clubs
                          </div>
                      </div>
                      <div
                        className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full xl:w-auto xl:flex-initial xl:mr-16">
                          <div className="block text-white font-extrabold text-2xl">23</div>
                          <div className="flex text-white text-xl">
                              <div className="w-9 border-t border-yellow mr-3 mt-3" />
                              events today
                          </div>
                      </div>
                  </div>
              </div>
              <div className="relative md:mt-2 xl:flex xl:self-end xl:mb-6 xl:mt-0 xl:flex-col xl:ml-10 hd:ml-42">
                  <div className="flex text-white items-end leading-none">
                      <div className="text-4xl font-extrabold tracking-tighter">
                          Fresh events
                      </div>
                      <Link href="/events">
                          <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
                              <ArrowNextSvg>
                                  <span className="mr-1">All events</span>
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


const Index = ({ user }) => (
    <>
        <Header
            user={user}
            animation={<Animation/>}
            hero={<EventsContainer/>}
        />
        <main className="relative z-10 mt-12 xl:mt-22-5">
            <div className="index-bg-bottom"/>
            <div className="container">
                <div className="flex text-black items-end leading-none text-black md:text-white">
                    <div className="text-4xl font-extrabold tracking-tighter">
                        Girls
                    </div>
                    <Link href="/girls">
                        <a className="block text-sm whitespace-no-wrap transition ml-4">
                            <ArrowNextSvg stroke="#fff">
                                <span className="mr-1">All girls</span>
                            </ArrowNextSvg>
                        </a>
                    </Link>
                </div>
                <GirlsBox/>

                <div className="flex text-black items-end leading-none mt-8">
                    <div className="text-4xl font-extrabold tracking-tighter">
                        Clubs
                    </div>
                    <Link href="/clubs">
                        <a className="block text-sm whitespace-no-wrap transition ml-4">
                            <ArrowNextSvg>
                                <span className="mr-1">All clubs</span>
                            </ArrowNextSvg>
                        </a>
                    </Link>
                </div>
                <ClubsBox/>
            </div>
        </main>

        <Footer/>
    </>
);

Index.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);

    if (!user) {
        return [];
    }
    return {user};
};

Index.getLayout = (page) => page;

export default Index;
