import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from 'components/SlashedLink'
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, GalleryWithThumbnail, AddressCard, EventCard, Loader, Button } from "UI";
import { CANTONS_AND_CITIES, GET_EMPLOYEE, ALL_EVENTS, ALL_EMPLOYEES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import { EmployeeSchedule } from "components/schedule";
import PriceAndService from "components/price/PriceAndService";
import {useTranslation} from "react-i18next";
import EmployeeMaps from "components/employee/EmployeeMaps";
import LangSelector from "UI/LangSelector";
import {LoginBox} from "components/login";
import Modal from "UI/Modal";
import translation from "services/translation";
import slug from "slug";
import {NextSeo} from "next-seo";
import CurrentLocation from "components/employee/CurrentLocation";
import cx from 'classnames';
import Slider from "react-slick";
import Cookies from 'js-cookie';

const EmployeeInformation = ({ user }) => {
  const {t, i18n} = useTranslation();
  const router = useRouter();
  const { id, canton, city } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, toggleModalOpen] = useState(false);
  const mapRef = React.useRef();

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id,
        canton_id: canton && cantons && (cantons.find(c => slug(c.name) === canton) || {}).id,
        city_id: city && cities && (cities.find(c => slug(c.name) === city) || {}).id,
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

  if (cantonsLoading || employeeLoading || loadingEmployees) {
    return <Loader/>;
  }

  const employees = employeesData ? employeesData.employees.data || [] : [];

  if (!employees) {
    return <Loader/>;
  }

  if (!canton || !city || !employee) {
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

  const canonical = `${process.env.APP_URL}/${i18n.language !== 'de' ? i18n.language + '/' : ''}${girlType}/${canton}/${city}/${employee.id}/information/`;

  const handleLightboxClick = index => {
    setLightboxIndex(index);
    toggleModalOpen(true);
  };

  const onClose = () => {
    setLightboxIndex(null);
    toggleModalOpen(false);
  };

  const [event] = employee.events;

  const sidebarColumn = (
    <>
      <Lightbox
        open={isModalOpen}
        index={lightboxIndex}
        onClose={onClose}
        images={[
          ...employee.photos.map(p => ({...p, type: 'image'})),
          ...employee.videos.map(v => ({...v, type: 'video'}))]
        }
      />

      <GalleryWithThumbnail
        photos={[
          ...employee.photos.map(p => ({...p, type: 'image'})),
          ...employee.videos.map(v => ({...v, url: v.thumb_url, type: 'video'}))
        ]}
        handleClick={handleLightboxClick}
        favorite={
          <FavoriteButton
            variables={{ model_id: employee.id, model_type: "employee" }}
            favorited={employee.favorited}
            large={false}
          />
        }
        large
      />
    </>
  );

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
            {employee.description}
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
                    <div className="flex items-center justify-center bg-red text-white text-xl font-bold w-15 h-15 rounded-full sm:mb-3">
                      {t('status.vip')}
                    </div>
                )}
                <div className="flex items-center justify-center bg-black text-white font-bold w-15 h-15 rounded-full mx-4 sm:mx-0 sm:mb-3">
                  100%
                </div>
                <div className="flex items-center justify-center bg-white border-2 border-divider w-15 h-15 rounded-full">
                  <CocktailSvg height={30} width={30} />
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
        canonical={canonical}
      />

      <EmployeeBox employee={employee} user={user} employees={employees}>
        {!user && (employee.isVip === true) ? (
          <div>
            <Modal
              title={t('common.login')}
              right={<LangSelector />}
              modalDialogStyle={{height: '650px'}}
            >
              <div className="mt-3 bg-red p-3 w-2/3 text-center mx-auto">
                  <span className="text-white">
                    {t('employees.available_only_for_authorized')}
                  </span>
              </div>
              <LoginBox />
            </Modal>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
              <div className="w-full lg:w-2/3 hd:w-2/5 px-3">
                {/*<div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>*/}
                {sidebarColumn}
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
                  <div className="text-2xl font-extrabold tracking-tighter leading-none">
                    {t('employees.nachste_event')}
                  </div>
                  <Link
                    href={`/${girlType}/canton/city/id/events?id=${employee.id}&canton=${slug(employee.city.canton.name)}&city=${slug(employee.city.name)}`}
                    as={`/${girlType}/${slug(employee.city.canton.name)}/${slug(employee.city.name)}/${employee.id}/events`}
                  >
                    <a className="block text-sm whitespace-no-wrap transition hover:text-red ml-4">
                      <ArrowNextSvg>
                        <span className="mr-1">{t('employees.all_events')}</span>
                      </ArrowNextSvg>
                    </a>
                  </Link>
                </div>

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
                            linkQueryParams={`?id=${employee.id}&canton=${slug(employee.city.canton.name)}&city=${slug(employee.city.name)}`}
                            as={`/${girlType}/${slug(employee.city.canton.name)}/${slug(employee.city.name)}/${employee.id}/events`}
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
