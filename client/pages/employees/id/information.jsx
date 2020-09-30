import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'components/SlashedLink'
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, GalleryWithThumbnail, EventCard, Loader } from "UI";
import { CANTONS_AND_CITIES, GET_EMPLOYEE, ALL_EMPLOYEES, DO_EVENT } from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import { EmployeeSchedule } from "components/schedule";
import PriceAndService from "components/price/PriceAndService";
import AlertTriangleSvg from "components/icons/AlertTriangleSvg";
import {useTranslation} from "react-i18next";
import EmployeeMaps from "components/employee/EmployeeMaps";
import {LoginBox} from "components/login";
import Modal from "UI/Modal";
import translation from "services/translation";

import {NextSeo} from "next-seo";
import CurrentLocation from "components/employee/CurrentLocation";
import Slider from "react-slick";
import Cookies from 'js-cookie';

const EmployeeInformation = ({ user }) => {
  const {t, i18n} = useTranslation();
  const router = useRouter();
  let { id, canton, city } = router.query;
  canton = canton ? canton.replace('/', '') : canton;
  city = city ? city.replace('/', '') : city;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, toggleModalOpen] = useState(false);
  const mapRef = React.useRef();

  const [doEvent] = useMutation(DO_EVENT);

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id,
        canton_id: canton && cantons && (cantons.find(c => c.slug === canton) || {}).id,
        city_id: city && cities && (cities.find(c => c.slug === city) || {}).id,
      },
      skip: !!canton && cantonsLoading
    }
  );

  const viewedGirlsIds = JSON.parse(Cookies.get('girls_last_viewed') || '[]');

  const queryIds = viewedGirlsIds.filter(gid => parseInt(gid) !== parseInt(id)).map(gid => parseInt(gid));

  const { data: employeesData, loading: loadingEmployees, error } = useQuery(ALL_EMPLOYEES, {
    variables: {
      first: 20,
      page: 1,
      status: 1,
      user_status: 1,
      filters: {
        ids: queryIds,
      },
    },
    skip: !viewedGirlsIds || !queryIds.length
  });

  useEffect(() => {
    doEvent({
      variables: {
        model_type: 'employee',
        model_id: id,
        event: 'view',
      }
    });
  }, []);

  if (cantonsLoading || employeeLoading || loadingEmployees) {
    return <Loader/>;
  }

  const employees = employeesData ? employeesData.employees.data || [] : [];

  if (!employees) {
    return <Loader/>;
  }

  if (!employee || employee.user_status === 2 || employee.status === 2) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  if (viewedGirlsIds.indexOf(employee.id) === -1) {
    viewedGirlsIds.unshift(employee.id);
  }

  Cookies.set('girls_last_viewed', JSON.stringify(viewedGirlsIds), { expires: 365 });

  const girlType = parseInt(employee.type) === 1
    ? 'girls'
    : 'trans';

  const canonical = () => {
    if (!city || !canton) {
      return `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}employees/${employee.id}/information/`;
    }

    return `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}${girlType}/${canton}/${city}/${employee.id}/information/`;
  };

  const getHref = (page) => {
    if (!city || !canton) {
      return `/employees/id/${page}?id=${employee.id}`;
    }

    return `/${girlType}/canton/city/id/${page}?id=${employee.id}&canton=${employee.city.canton.slug}&city=${employee.city.slug}`;
  };

  const getAs = (page) => {
    if (!city || !canton) {
      return `/employees/${employee.id}/${page}`;
    }

    return `/${girlType}/${employee.city.canton.slug}/${employee.city.slug}/${employee.id}/${page}`;
  };

  const handleLightboxClick = index => {
    setLightboxIndex(index);
    toggleModalOpen(true);
  };

  const onClose = () => {
    setLightboxIndex(null);
    toggleModalOpen(false);
  };

  const getBigThumbUrl = (photo) => {
    if (JSON.parse(photo.custom_properties).porn && !user) {
      // if (photo.big_thumb_blur_url) {
        photo.vip = true;
        // return photo.big_thumb_blur_url;
      // }
    }

    return photo.big_thumb_url;
  };

  const getPhotoUrl = (photo) => {
    if (JSON.parse(photo.custom_properties).porn && !user) {
      // if (photo.blur_url) {
        photo.vip = true;
        // return photo.blur_url;
      // }
    }

    return photo.url;
  };

  const [event] = employee.events;

  const sidebarColumn = (
    (employee.photos.length + employee.videos.length === 0) ?
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-center" style={{ backgroundColor: '#f6f6f6' }}>
          <img
            className="object-cover w-full h-photo sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-md xl:h-e-photo-xl hd:h-e-photo-hd"
            style={{ width: 200 }} src="/static/img/girl-no-photo.jpg" alt=""/>
        </div>
      </div>
      :
      <>
        <Lightbox
          open={isModalOpen}
          index={lightboxIndex}
          onClose={onClose}
          images={[
            ...employee.photos.map(p => ({ ...p, type: 'image', url: getPhotoUrl(p) })),
            ...employee.videos.map(v => ({ ...v, type: 'video' }))]
          }
        />

        <GalleryWithThumbnail
          photos={[
            ...employee.photos.map(p => ({ ...p, type: 'image', big_thumb_url: getBigThumbUrl(p) })),
            ...employee.videos.map(v => ({ ...v, url: v.thumb_url, type: 'video' }))
          ]}
          handleClick={handleLightboxClick}
          favorite={
            <FavoriteButton
              variables={{ model_id: employee.id, model_type: 'employee' }}
              favorited={employee.favorited}
              small
              iconWidth={18}
              iconHeight={16}
              large={false}
            />
          }
          large
        />
      </>
  )

  const getStars = starsCount => {
    let stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(<RatingSvg key={i} checked={i <= starsCount} />);
    }

    return stars;
  };

  const getServiceFor = (gender) => {
    if (gender === 1) {
      return t('common.man');
    }

    if (gender === 2) {
      return t('common.woman');
    }

    if (gender === 3) {
      return t('common.couple');
    }
  };

  const contentColumn = (
    <>
      <div className="flex -mx-3">
        <div className="w-full hd:w-3/5 px-3">
          {/*<div className="text-2xl font-extrabold mb-5">{t('employees.description')}</div>*/}
          <div className="bg-white rounded-t-lg p-4 hd:p-8">
            {employee.description || "Inc bin Nina, sehr zartliche, mega liebe end sexy Swisslady ind mochte DICH leidenschaftilich verfuhren, Dich kussen, mit Dir schmushen... heisses 69 zusammen geniessen, Dich ausgiebig spuren and mit unschlagbarem Franzosisch verwohnen!"}
          </div>
          <div className="border-b border-divider" />
          <div className="flex flex-col sm:flex-row bg-white rounded-b-lg p-4 hd:p-8">
            <div className="w-full sm:w-3/5">
              <section className="mb-3">
                <div className="text-grey">{t('common.gender')}</div>
                <div className="line" />
                <div className="w-32">{t('common.female')}</div>
              </section>

              <section className="my-3">
                <div className="text-grey">{t('employees.gender_type')}</div>
                <div className="line" />
                <div className="w-32">TS</div>
              </section>

              <section className="mt-3 mb-6">
                <div className="text-grey">{t('employees.type_woman')}</div>
                <div className="line" />
                <div className="w-32">{t('nationality.asian')}</div>
              </section>

              {(employee.service_for || []).length > 0 &&
                <section className="mt-3 mb-6">
                  <div className="text-grey">{t('employees.do_service_for')}</div>
                  <div className="line" />
                  <div className="w-32">
                    {employee.service_for.map((gender, i) => (
                      <span key={i}>
                        {getServiceFor(gender)}{i < employee.service_for.length - 1 ? ', ' : ''}
                      </span>
                    ))}

                  </div>
                </section>
              }

              {employee.parameters.map(p => (
                  <section className="my-3" key={p.id}>
                    <div className="text-grey">{translation.getLangField(p.parameter.name, i18n.language)}</div>
                    <div className="line" />
                    <div className="w-32">{translation.getLangField(p.parameter_option.value, i18n.language)}</div>
                  </section>
              ))}

              {!!employee.languages.length &&
                <section className="mt-6 mb-3">
                  <div className="text-grey">{t('employees.languages')}</div>
                  <div className="line" />
                  <div className="w-32">
                    {(employee.languages || []).map(lang => (
                      <div className="flex items-center justify-between mb-2" key={lang.id}>
                        {t('language.' + lang.code)}
                        <span className="flex justify-between w-16">
                        <div className="flex ml-2">
                          {getStars(lang.pivot.stars)}
                        </div>
                      </span>
                      </div>
                    ))}
                  </div>
                </section>
              }
            </div>
            <div className="w-full sm:w-2/5">
              <div className="flex sm:flex-col items-end">
                {employee.isVip && (
                  <div
                    className="flex items-center justify-center bg-red text-white text-xl font-bold w-15 h-15 rounded-full sm:mb-3">
                    {t('status.vip')}
                  </div>
                )}

                {(employee.status === 1 && employee.user_status === 1) ?
                  (<div
                      className="flex items-center justify-center bg-black text-white font-bold w-15 h-15 rounded-full mx-4 sm:mx-0 sm:mb-3">
                      100%
                    </div>
                  ) : ''}
                <div
                  className="flex items-center justify-center bg-white border-2 border-divider w-15 h-15 rounded-full">
                  <CocktailSvg height={30} width={30}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 px-3 hidden hd:block">
          <CurrentLocation user={user} employee={employee} mapRef={mapRef}/>
        </div>
      </div>
    </>
  );

  return (
    <>
      <NextSeo
        title={employee.name}
        canonical={canonical()}
      />

  <EmployeeBox employee={employee} user={user} noName={!user && (employee.isVip === true)} employees={employees} showNavLinks={user || !employee.isVip}>
        {!user && (employee.isVip === true) ? (
            <div className="mt-4 flex flex-col items-center">
                <div className="px-5 py-3 hd:px-10 relative border-light-grey border rounded-lg sm:mt-2 mb-8"
                     style={{backgroundColor: "#ffeff3", width: "calc(100% - 8px)", maxWidth: 540}}>
                    <div className="flex">
                        <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                                <div className="mr-4">
                                    <AlertTriangleSvg />
                                </div>
                                 <span className="text-lg">{t('chat.chat_available_for_authorized')}</span>
                            </div>
                          </div>
                      </div>
                </div>
                <div className="w-full" style={{maxWidth: 550}}>
                    <Modal
                      title={t('common.login')}
                      style={{height: "auto"}}
                      modalDialogStyle={{height: "auto"}}
                    >
                      {/*<div className="mt-3 mb-2 bg-red p-3 w-2/3 text-center mx-auto">
                                <span className="text-white">
                                  {t('chat.chat_available_for_authorized')}
                                </span>
                      </div>*/}
                      <LoginBox />
                    </Modal>
                </div>
            </div>
        ) : (

          <>
              <div className="sm:hidden" style={{marginLeft:-20, marginRight: -20}}>
                  {sidebarColumn}
              </div>
            <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
              <div className="w-full lg:w-2/3 hd:w-2/5 sm:px-3 pb-6" style={{ maxWidth: 750 }}>
                {/*<div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>*/}
                <div className="hidden sm:block">
                    {sidebarColumn}
                </div>
              </div>
              <div className="w-full lg:w-1/3 px-3 block sm:flex lg:block hd:hidden justify-center mb-5">
                <CurrentLocation user={user} employee={employee} mapRef={mapRef}/>
              </div>
              <div className="w-full hd:w-3/5 px-3">{contentColumn}</div>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full hd:w-2/5 px-3">

                <EmployeeSchedule
                  title={`${t('schedule.my_schedule_in')} ${employee.club ? employee.club.name : ""}`}
                  employee={employee}
                />
              </div>

              <div className="w-full hd:w-2/5 px-3">
                <PriceAndService title={t('titles.price_and_service')} prices={employee.prices} services={employee.services} />
              </div>

              <div className="w-full hd:w-1/5 px-3">
                <div className="flex items-end my-5">
                  <div className="text-2xl font-bold tracking-tighter leading-none">
                    {t('employees.nachste_event')}
                  </div>
                  <Link
                    href={getHref('events')}
                    as={getAs('events')}
                  >
                    <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
                      <ArrowNextSvg>
                        <span className="mr-1">{t('employees.all_events')}</span>
                      </ArrowNextSvg>
                    </a>
                  </Link>
                </div>
                {employee.events.length === 0 &&
                    <div className="flex flex-col sm:flex-row bg-white text-sm hd:text-base rounded-lg p-4 lg:p-12">
                        <span className="text-center w-full">
                            No Events yet
                        </span>
                    </div>
                }
                {employee.events.length > 0 &&
                  <div className="-mx-3">
                    <Slider
                      className="relative block"
                      arrows={false}
                      infinite={false}
                      swipeToSlide={true}
                      slidesToShow={1}
                      // autoplay={true}
                      // dots={true}
                      // autoplaySpeed={5000}
                      responsive={[
                        // {
                        //   breakpoint: 2800,
                        //   settings: {
                        //     slidesToShow: 1,
                        //     slidesToScroll: 1,
                        //     // infinite: true,
                        //   }
                        // },
                        // {
                        //   breakpoint: 1779,
                        //   settings: {
                        //     slidesToShow: 4,
                        //     slidesToScroll: 1,
                        //     // infinite: true,
                        //   }
                        // },
                        {
                          breakpoint: 1320,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            // infinite: true,
                          }
                        },
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            // infinite: true,
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            // infinite: true,
                            dots: true
                          }
                        },
                      ]}
                    >
                      {employee.events.map((event, index) => {
                        return (
                          <EventCard
                            key={event.id}
                            href={`/${girlType}/canton/city/id/events`}
                            inProfile={true}
                            linkQueryParams={`?id=${employee.id}&canton=${employee.city.canton.slug}&city=${employee.city.slug}`}
                            as={`/${girlType}/${employee.city.canton.slug}/${employee.city.slug}/${employee.id}/events`}
                            {...event}
                          />
                        );
                      })}
                    </Slider>
                  </div>
                }
              </div>
            </div>

            <div className="mt-6 mb-6" ref={mapRef}>
              <EmployeeMaps employee={employee} goBtn={true}/>
            </div>
          </>
        )}
      </EmployeeBox>
    </>
  );
};

EmployeeInformation.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return {};
  }

  return { user };
};

EmployeeInformation.getLayout = (page) => page;

export default EmployeeInformation;
