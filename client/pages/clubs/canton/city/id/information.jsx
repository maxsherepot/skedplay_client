import React, {useState} from "react";
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
import {useMutation, useQuery} from "@apollo/react-hooks";
import {ClubBox, ClubGirlsBox} from "components/club";
import {ClubSchedule} from "components/schedule";
import {useTranslation} from "react-i18next";
import Distance from "components/distance";
import EmployeeMaps from "components/employee/EmployeeMaps";
import {Formik} from "formik";
import {CREATE_SUBSCRIBE_CLUB, CANTONS_AND_CITIES} from "queries";
import {getErrors} from "utils/index";
import slug from "slug";
import Head from "next/head";

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

const SubscribeClubForm = ({clubId}) => {
  const [createSubscribeClub] = useMutation(CREATE_SUBSCRIBE_CLUB);
  const {t} = useTranslation();
  const router = useRouter();

  const handleSubmits = async values => {
    try {
      const {
        data: {
          createSubscribeClub: {status, message}
        }
      } = await createSubscribeClub({
        variables: {
          email: values.email,
          club_id: clubId
        }
      });

      if (status) {
        router.reload();
      }

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
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(),
      })}
      onSubmit={handleSubmits}
    >
      {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="bg-white text-sm hd:text-base rounded-lg p-6 mt-2">
              <span className="text-xl font-medium mb-5">{t('clubs.subscribe_to_club_news')}</span>
              <TextField
                className="px-3 mt-3"
                label={t('clubs.mail')}
                name="email"
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-xs px-5 text-sm"
                >
                  {t('clubs.subscribe')}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
};

const ClubInformation = ({user}) => {
  const router = useRouter();
  const {id, canton, city} = router.query;

  const [isShowPhone, toggleShowPhone] = useState(false);

  const {loading: cantonsLoading, data: {cantons, cities} = {}} = useQuery(
    CANTONS_AND_CITIES
  );

  const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
    variables: {
      id,
      canton_id: canton && cantons && (cantons.find(c => slug(c.name) === canton) || {}).id,
      city_id: city && cities && (cities.find(c => slug(c.name) === city) || {}).id,
    },
    skip: !!canton && cantonsLoading
  });

  const {t, i18n} = useTranslation();

  if (loading) {
    return <Loader/>;
  }

  if (!club) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const logo_url = (club.logo !== null) ? club.logo['url'] : "/static/img/club-logo.png";
  const [event] = club.events;
  const [phone] = JSON.parse(club.phones);

  const canonical = `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}clubs/${canton}/${city}/${club.id}/information/`;

  const Contacts = () => (
    <>
      <div className="text-2xl font-extrabold my-5">{t('clubs.address_and_contacts')}</div>

      <div className="bg-white rounded-lg p-4">
        <p className="font-bold">{club.address}</p>
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
              +{phone}
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
    <div className="flex items-center justify-center relative h-32 lg:h-full w-full">
      <div className="logo-small__div">
        <img src={logo_url} alt=""/>
      </div>
      <div className="mx-8 lg:mx-0"/>
      <div className="flex flex-col relative lg:absolute inset-0 items-center justify-end lg:mb-4">
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
        <div className="w-full sm:w-8/12 lg:w-9/12 px-3 lg:h-64">
          <div className="flex text-2xl font-extrabold my-5">{t('employees.description')}</div>

          <div className="flex flex-col lg:flex-row flex-wrap bg-white rounded-t-lg">
            <div
              className="w-full lg:w-2/12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-divider">
              <ClubLogo favorited={club.favorited}/>
            </div>
            <div className="flex flex-col justify-between lg:w-10/12 p-4 hd:p-8 lg:h-64">
              {club.description}

              <div className="flex items-center text-light-grey">
                <FakeSvg className="float-left"/>
                <span className="ml-3">{t('clubs.fake_or_not_working')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-4/12 lg:w-3/12 px-3 hidden sm:block">
          <Contacts/>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full sm:w-8/12 lg:w-9/12 px-3">
          <ClubGirlsBox employees={club.employees} club={club}/>
        </div>
        {event && (
          <>
            <div className="w-full sm:w-4/12 lg:w-3/12 px-3 hidden sm:block">
              <div className="flex items-end my-5">
                <div className="text-2xl font-extrabold tracking-tighter leading-none">
                  {t('clubs.next_event', {name: club.name})}
                </div>
              </div>

              <div className="-mx-3">
                <EventCard href={`/clubs/${id}/events`} {...event} height={250}/>
              </div>

              <Link
                href={`/clubs/canton/city/id/events?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
                as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/events`}
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
        <div className="w-full hd:w-9/12 px-3">
          <div className="flex flex-col hd:flex-row -mx-3">
            <div className="w-full hd:w-1/2 px-3">
              <div className="text-2xl font-extrabold mb-5">{t('clubs.photos')}</div>
              <Gallery photos={club.photos} height="424px"/>
            </div>
            <div className="w-full hd:w-1/2 px-3 mt-5 hd:mt-0">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-7/12 px-3 hd:w-full hd:px-0">
                  <div className="text-2xl font-extrabold mb-5">
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
                                {service.name}
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
                  <SubscribeClubForm clubId={id}/>
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
      <Head>
        <link rel="canonical" href={canonical}/>
      </Head>

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
