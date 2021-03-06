import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from 'components/SlashedLink'
import cx from "classnames";
import * as Yup from "yup";
import checkLoggedIn from "lib/checkLoggedIn";
import {
  ArrowNextSvg,
  PlusSvg,
  FakeSvg,
  HeartSvg,
  RatingSvg,
  MapSvg,
  MessageSvg
} from "icons";
import {Gallery, EventCard, Loader, TextField} from "UI";
import {GET_CLUB} from "queries";
import Button from "@material-ui/core/Button";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {ClubBox, ClubGirlsBox} from "components/club";
import {ClubSchedule} from "components/schedule";
import {useTranslation} from "react-i18next";
import Distance from "components/distance";
import EmployeeMaps from "components/employee/EmployeeMaps";
import EmployeeComplaintPopup from "components/popups/EmployeeComplaintPopup";
import EmployeeComplaintSuccessPopup from "components/popups/EmployeeComplaintSuccessPopup";
import {Formik} from "formik";
import {CANTONS_AND_CITIES, DO_EVENT} from "queries";
import {getErrors} from "utils/index";

import {NextSeo} from "next-seo";
import translation from "services/translation";

const DistanceView = ({distanceKm}) => {
  if (!distanceKm) {
    return '';
  }

  const {t, i18n} = useTranslation();

  return (
    <div className="flex items-center my-2">
      <MapSvg/>
      <span className="ml-3 text-grey text-sm">{distanceKm} {t('index.km')} {t('clubs.from_me')}</span>
    </div>
  )
};

const ClubInformation = ({user}) => {
  const [showComplaintSuccessPopup, setShowComplaintSuccessPopup] = useState(false);
  const router = useRouter();
  let {id, canton, city} = router.query;

  canton = canton.replace('/', '');
  city = city.replace('/', '');

  const [doEvent] = useMutation(DO_EVENT);

  const [isShowPhone, toggleShowPhone] = useState(false);

  const {loading: cantonsLoading, data: {cantons, cities} = {}} = useQuery(
    CANTONS_AND_CITIES
  );

  const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
    variables: {
      id,
      canton_id: canton && cantons && (cantons.find(c => c.slug === canton) || {}).id,
      city_id: city && cities && (cities.find(c => c.slug === city) || {}).id,
    },
    // fetchPolicy: 'no-cache',
    skip: !!canton && cantonsLoading
  });

  const {t, i18n} = useTranslation();

  useEffect(() => {
    doEvent({
      variables: {
        model_type: 'club',
        model_id: id,
        event: 'view',
      }
    });
  }, []);

  if (loading || cantonsLoading) {
    return <Loader/>;
  }

  if (!club) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const logo_url = (club.logo !== null) ? club.logo['thumb_url'] || club.logo['url'] : "/static/img/club-logo.png";
  const [event] = club.events;
  const [phone] = JSON.parse(club.phones);

  const canonical = `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}clubs/${canton}/${city}/${club.id}/information/`;


  const Contacts = () => (
    <>
      <div className="text-2xl font-bold my-5">{t('clubs.address_and_contacts')}</div>

      <div className="bg-white rounded-lg p-4">
        <p className="font-medium  flex flex-col">
            {(club.address || "").split(",").map((item, i) => {
                return (
                    <span key={item}>{item.trim()}</span>
                )
            })}
        </p>
        {(club.lat && club.lng) &&
        <Distance
          originByGeo={true}
          destination={{lat: club.lat, lng: club.lng}}
        >
          <DistanceView/>
        </Distance>
        }
      </div>

      <div className="bg-white rounded-lg p-4 my-4">
        <p className="font-bold">www.s-pamela.ch</p>
        <div className="flex items-center my-2">
          <MessageSvg/>
          <span className="ml-3 text-red text-sm">studiomail@gmail.com</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <p className="font-bold">{t('about.clubs.administrator')}: James Uebb</p>
        <div className="flex items-center my-2">
          <div className="flex bg-xs-grey px-3 py-1 mt-2 rounded-full">
            <span
              className={cx("block whitespace-no-wrap overflow-hidden", {
                "w-8": !isShowPhone
              })}
            >
              {phone}
            </span>
            {!isShowPhone && (
              <span
                className="ml-4 text-red whitespace-no-wrap"
                onClick={() => toggleShowPhone(!isShowPhone)}
              >
                  {t('about.clubs.show_number')}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const ClubLogo = ({favorited}) => (
    <div className="flex items-center sm:items-start justify-center relative h-32 py-4 sm:py-6 lg:h-full w-full">
      <div className="logo-midd__div" style={{height: "auto"}}>
        <img src={logo_url} alt=""/>
      </div>
      <div className="mx-8 lg:mx-0"/>
      <div className="hidden flex flex-col relative lg:absolute inset-0 items-center justify-end lg:mb-4">
        <div className="flex mb-2">
          <RatingSvg className="mx-1"/>
          <RatingSvg className="mx-1"/>
          <RatingSvg className="mx-1"/>
          <RatingSvg className="mx-1"/>
        </div>
        <div>23 {t('about.clubs.reviews')}</div>
      </div>

      {favorited && (
        <div className="flex absolute inset-0 items-start justify-end m-3">
          <HeartSvg className="stroke-red fill-red"/>
        </div>
      )}
    </div>
  );



  const contentColumn = (
    <>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full sm:w-8/12 lg:w-9/12 md:px-3 sm:px-0 lg:h-64">
          <div className="flex text-2xl font-bold my-5">{t('employees.description')}</div>

          <div className="flex flex-col lg:flex-row flex-wrap bg-white rounded-t-lg">
            <div
              className="w-full lg:w-3/12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-divider">
              <ClubLogo favorited={club.favorited}/>
            </div>
            <div className="flex flex-col justify-between lg:w-9/12 p-4 pb-2 hd:p-8 lg:h-64">
              {club.description}

              <div className="mt-2">
                  <EmployeeComplaintPopup
                    employeeId={""}
                    user={user}
                    onSuccess={() => setShowComplaintSuccessPopup(true)}
                    trigger={
                        <Button size="small">
                            <div className="cursor-pointer flex items-center text-light-grey">
                              <FakeSvg className="float-left"/>
                              <span className="ml-3">{t('clubs.fake_or_not_working')}</span>
                            </div>
                        </Button>
                    }
                  />

                  <EmployeeComplaintSuccessPopup user={user} open={showComplaintSuccessPopup} setOpen={setShowComplaintSuccessPopup}/>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-4/12 lg:w-3/12 px-3 hidden sm:block">
          <Contacts/>
        </div>
      </div>

      <div className="flex flex-wrap md:p-4 sm:p-0 -mx-3">
        <div className="w-full md:w-8/12 lg:w-9/12 px-3">
          <ClubGirlsBox employees={club.employees} club={club} user={user}/>
        </div>
        {event && (
          <>
            <div className="w-full md:w-4/12 lg:w-3/12 px-3 hidden sm:block">
              <div className="flex items-end my-5">
                <div className="text-2xl font-bold tracking-tighter leading-none">
                  {t('clubs.next_event', {name: club.name})}
                </div>
              </div>

              <div className="-mx-3">
                <EventCard href={`/clubs/${id}/events`} inProfile={true} {...event} height={250}/>
              </div>

              <Link
                href={`/clubs/canton/city/id/events?id=${club.id}&canton=${club.city.canton.slug}&city=${club.city.slug}`}
                as={`/clubs/${club.city.canton.slug}/${club.city.slug}/${club.id}/events`}
              >
                <a className="block text-sm whitespace-no-wrap transition hover:text-red">
                  <ArrowNextSvg>
                    <span className="mr-2">{t('common.all_events')}</span>
                  </ArrowNextSvg>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full hd:w-9/12 md:px-3 sm:px-0">
          <div className="flex flex-col hd:flex-row -mx-3">
            <div className="w-full hd:w-1/2 px-3">
              <div className="text-2xl font-bold mb-5">{t('clubs.photos')}</div>
              <Gallery photos={club.photos} height="424px"/>
            </div>
            <div className="w-full hd:w-1/2 px-3 mt-5 hd:mt-0">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-7/12 px-3 hd:w-full hd:px-0">
                  <div className="text-2xl font-bold mb-5">
                    {t('clubs.services_and_pricing')}
                  </div>
                  <div className="bg-white text-sm hd:text-base rounded-lg p-6">
                    <div className="w-full sm:w-2/4 mb-5">
                      <section className="mb-3">
                        <div className="text-grey">{t('clubs.entry_from')} 16:00</div>
                        <div className="line"/>
                        <div className="w-12 text-dark-green">{t('common.free')}</div>
                      </section>

                      <section className="mb-3">
                        <div className="text-grey">{t('clubs.entry_from')} 00:00</div>
                        <div className="line"/>
                        <div className="w-12">$100</div>
                      </section>
                    </div>

                    <div className="text-xl font-medium mb-5">
                      {t('clubs.girls_pricing')}
                    </div>

                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 px-2 sm:px-0">
                        <section className="mb-3">
                          <div className="text-grey">15 {t('common.min')}</div>
                          <div className="line"/>
                          <div className="w-12">$100</div>
                        </section>
                        <section className="mb-3">
                          <div className="text-grey">30 {t('common.min')}</div>
                          <div className="line"/>
                          <div className="w-12">$150</div>
                        </section>
                        <section className="mb-3">
                          <div className="text-grey">45 {t('common.min')}</div>
                          <div className="line"/>
                          <div className="w-12">$250</div>
                        </section>
                        <section className="mb-3">
                          <div className="text-grey">1 {t('common.hour')}</div>
                          <div className="line"/>
                          <div className="w-12">$300</div>
                        </section>
                        <section className="mb-3">
                          <div className="text-grey">2 {t('common.hours')}</div>
                          <div className="line"/>
                          <div className="w-12">$300</div>
                        </section>
                        <section className="mb-3">
                          <div className="text-grey">3 {t('common.hours')}</div>
                          <div className="line"/>
                          <div className="w-12">$600</div>
                        </section>
                        <section className="mb-3">
                          <div className="text-grey">{t('common.night')}</div>
                          <div className="line"/>
                          <div className="w-12">$1500</div>
                        </section>
                      </div>
                      <div className="w-full sm:w-2/3 sm:px-2 hd:px-6 py-1">
                        <div className="flex flex-wrap -mx-2">
                          {club.services.map(service => (
                            <div key={service.id} className="px-2">
                              <div
                                className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                                {translation.getLangField(JSON.parse(service.name), i18n.language)}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-2 my-2">{t('clubs.extra_service')}</div>
                        <div className="flex flex-wrap -mx-2">
                          <div className="px-2">
                            <div
                              className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                              {t('clubs.anal')} <span className="text-red ml-1">+$100</span>
                            </div>
                          </div>
                          <div className="px-2">
                            <div
                              className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                              {t('clubs.erotic_massage')}
                              <span className="text-red ml-1">+$100</span>
                            </div>
                          </div>
                          <div className="px-2">
                            <div
                              className="bg-white border border-divider rounded-full px-2 py-2 text-xs mb-4">
                              <PlusSvg/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-5/12 px-3 hd:hidden">
                  <ClubSchedule
                    title={`${t('about.clubs.schedule_in')} ${club.name}`}
                    club={club}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full hd:w-3/12 px-3 hidden hd:block">
          <ClubSchedule title={`${t('about.clubs.schedule_in')} ${club.name}`} club={club}/>
        </div>
      </div>

      <div className="mt-6 mb-6">
        <EmployeeMaps employee={club}/>
      </div>
    </>
  );

  return (
    <>
      <NextSeo
        title={club.name}
        canonical={canonical}
      />

      <ClubBox club={club} user={user}>
        {contentColumn}
      </ClubBox>
    </>
  );
};

ClubInformation.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return {user};
};

ClubInformation.getLayout = page => page;

export default ClubInformation;
