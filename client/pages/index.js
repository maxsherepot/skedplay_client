import React from "react";
import Link from 'components/SlashedLink'
import {Header, Footer, Loader} from "UI";
import {ArrowNextSvg} from "icons";
import GirlsBox from "components/homepage/GirlsBox";
import EventsBox from "components/homepage/EventsBox";
import ClubsBox from "components/homepage/ClubsBox";
import checkLoggedIn from "lib/checkLoggedIn";
import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/react-hooks";
import {GET_PAGE, INDEX_PAGE_DATA} from 'queries';
import translation from "services/translation";
import { NextSeo } from 'next-seo';

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

const EventsContainer = ({events}) => {
  const {t, i18n} = useTranslation();

  return (
    <div className="container mx-auto relative z-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col md:flex-row lg:flex-col">
          <h1 className="block text-white pl-1 pt-1 sm:pl-4 sm:pt-1 md:pl-8 lg:pl-0 lg:pt-1">
            <div
              className="block relative -mt-1 z-10 font-extrabold uppercase tracking-tighter leading-tight text-4-65xl sm:text-5-75xl md:text-6-5xl xl:text-7xl">
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
          </h1>
          <div
            className="flex flex-wrap mt-2 sm:mt-3 sm:justify-between md:flex-col md:ml-12 md:mt-5 lg:flex-row lg:justify-start lh:ml-0 lg:mt-3">
            <div
              className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full lg:w-auto lg:flex-initial lg:mr-8 xl:mr-16 hover:cursor-pointer">
              <a href="/girls">
                <div className="block text-white font-extrabold text-2xl">
                  11 243
                </div>
                <div className="flex text-white text-xl">
                  <div className="w-9 border-t border-yellow mr-3 mt-3"/>
                  {t('common.girls')}
                </div>
              </a>
            </div>
            <div
              className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full lg:w-auto lg:flex-initial lg:mr-8 xl:mr-16 hover:cursor-pointer">
              <a href="/clubs">
                <div className="block text-white font-extrabold text-2xl">
                  350
                </div>
                <div className="flex text-white text-xl">
                  <div className="w-9 border-t border-yellow mr-3 mt-3"/>
                  {t('common.clubs')}
                </div>
              </a>
            </div>
            <div
              className="flex flex-auto flex-col leading-none mb-9 w-1/2 sm:w-1/3 md:w-full lg:w-auto lg:flex-initial lg:mr-8 xl:mr-16 hover:cursor-pointer">
              <a href="/events">
                <div className="block text-white font-extrabold text-2xl">23</div>
                <div className="flex text-white text-xl">
                  <div className="w-9 border-t border-yellow mr-3 mt-3"/>
                  {t('common.events')} {t('common.today')}
                </div>
              </a>
            </div>
          </div>
        </div>

        <EventsBox events={events}/>
      </div>
    </div>
  );
};

const Index = ({user}) => {
  const {t, i18n} = useTranslation();

  const { data: { page, events, clubs, employees } = {}, loading} = useQuery(INDEX_PAGE_DATA);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <NextSeo
        title={translation.getLangField(page.title, i18n.language)}
        description={translation.getLangField(page.description, i18n.language)}

        additionalMetaTags={[{
          name: 'keywords',
          content: translation.getLangField(page.keywords, i18n.language)
        }]}
      />

      <Header
        user={user}
        animation={<Animation/>}
        hero={<EventsContainer events={events}/>}
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
          <GirlsBox employees={employees}/>

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
          <ClubsBox clubs={clubs}/>
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
