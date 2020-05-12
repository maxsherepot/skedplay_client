import React, {useState} from "react";
import Link from 'components/SlashedLink'
import {Button, Loader, SelectField, LocationSearchInput, CheckboxField} from "UI";
import {UserSvg, StarSvg, PhotoSvg, VideoSvg} from "icons";
import {useTranslation} from "react-i18next";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from 'moment';
import * as Yup from "yup";
import {Field, Formik, useFormikContext} from "formik";
import {UPDATE_EMPLOYEE_CURRENT_POSITION} from 'queries';

const CurrentPosition = ({user}) => {
  const {t, i18n} = useTranslation();
  const [showEditBlock, setShowEditBlock] = useState(false);
  const [updateEmployeeCurrentPosition] = useMutation(UPDATE_EMPLOYEE_CURRENT_POSITION);

  // const { loading, data, refetch } = useQuery(CLUBS_SEARCH, {
  //   variables: {
  //     filters: {
  //       // search: '',
  //     }
  //   }
  // });

  if (loading) {
    return <Loader/>
  }

  const {data: {employee, employee_schedule, clubsSearch} = {}, loading, refetch} = useQuery(
    gql`
        query getPositionData($id: ID!, $clubFilters: ClubFilters) {
            employee(id: $id) {
                id
                address
                current_club {
                    id
                    name
                }
                current_address
            }
            employee_schedule(employee_id: $id) {
                id
                day
                day_name
                start
                end
                available
                at_address
                address
                club {
                    id
                    name
                    phones
                }
            }
            clubsSearch(filters: $clubFilters) {
                id
                name
            }
        }
    `, {
      variables: {
        id: user.employee.id,
        clubFilters: {
          // search: '',
        }
      }
    });

  if (loading) {
    return <Loader/>
  }

  const currentDaySchedule = employee_schedule.find(s => s.day === (new Date).getDay());

  const getCurrentPosition = () => {
    const positionWasSet = !!employee.current_address || !!employee.current_club;

    if (!positionWasSet) {
      return null;
    }

    if (employee.current_club) {
      return employee.current_club.name;
    }

    return employee.current_address;
  };

  const getCurrentPositionFromSchedule = () => {
    if (!currentDaySchedule) {
      return null;
    }

    if (!currentDaySchedule.available) {
      return t('about.clubs.day_off');
    }

    if (currentDaySchedule.club) {
      return currentDaySchedule.club.name;
    }

    if (currentDaySchedule.at_address && currentDaySchedule.address) {
      return currentDaySchedule.address;
    }

    return null;
  };

  const clubs = clubsSearch.map(c => ({value: `${c.id}`, label: c.name}));

  const validationSchema = {
    // club_id: Yup.number(),
    // address: Yup.string(),
  };

  const onSubmit = async ({club_id, address, save_for_current_day}) => {
    await updateEmployeeCurrentPosition({
      variables: {
        employee: user.employee.id,
        input: {
          club_id: club_id === 0 || club_id === -1 ? null : club_id,
          address: club_id === 0 ? address : null,
          save_for_current_day: save_for_current_day,
        }
      }
    });

    refetch().then(() => setShowEditBlock(false));
  };

  return (
    <div className="px-3 w-full mb-5">
      <h3 className="text-xl font-bold mb-2">
        Today {moment().format("D MMMM")}
      </h3>
      <div className="text-lg font-bold mb-2">
        {t('account.your_current_position')}:&nbsp;
        {!!getCurrentPosition() ?
          <>
            {getCurrentPosition()}
          </>
          :
          <>
            {getCurrentPositionFromSchedule() ?
              <>
                {getCurrentPositionFromSchedule()}({t('account.from_schedule')})
              </>
              :
              <>
                {employee.address}({t('account.from_address')})
              </>
            }
          </>
        }
      </div>
      {!showEditBlock &&
        <div>
          <Button className="w-30" size="xs" onClick={() => setShowEditBlock(true)}>
            {t('common.change')}
          </Button>
        </div>
      }

      {showEditBlock &&
        <div className="text-lg font-bold mb-2">
          <Formik
            initialValues={{
              club_id: !employee.current_address
                ? employee.current_club
                  ? employee.current_club.id
                  : -1
                : 0,
              address: employee.current_address ? employee.current_address : '',
              save_for_current_day: false,
            }}
            validationSchema={Yup.object().shape({
              ...validationSchema
            })}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                {isSubmitting && <Loader/>}
                <div className="flex text-black mt-3">
                  <SelectField
                    className="w-full md:w-1/2 px-2"
                    inputClassName="w-full md:w-1/3"
                    label={t('schedule.select_available_club')}
                    name={`club_id`}
                    options={[
                      {value: -1, label: t('common.not_selected')},
                      {value: 0, label: t('schedule.add_my_location')},
                      ...clubs
                    ]}
                    placeholder=""
                    onSelect={value => setFieldValue('address', '')}
                  />

                  {parseInt(values.club_id) === 0 &&
                    <LocationSearchInput
                      className="w-full md:w-1/2 px-2"
                      inputClassName=""
                      name={`address`}
                    />
                  }
                </div>

                <div className="px-2 mb-3">
                  <CheckboxField
                    label={t('schedule.save_position_for_current_day')}
                    name={'save_for_current_day'}
                  />
                </div>

                <div className="flex">
                  <div className="w-1/2 px-2">
                    <Button
                      className="w-full"
                      type="submit"
                      size="xs"
                      disabled={isSubmitting}
                    >
                      {t('common.save')}
                    </Button>
                  </div>
                  <div  className="w-1/2 px-2">
                    <Button
                      className="w-full"
                      size="xs"
                      level="primary-black"
                      outline
                      onClick={() => setShowEditBlock(false)}
                    >
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      }
    </div>
  );
};

const PrivateBox = ({user}) => {
  const {t, i18n} = useTranslation();

  const employeeButtonText = user.employee
    ? t('common.edit')
    : t('common.add');

  const employeeLink = user.employee
    ? '/account/ad'
    : '/girls/add';

  const counters = [
    {
      counter: "employees_photos",
      title: t('account.photos'),
      icon: "photo",
      buttonText: null
    },
    {
      counter: "employees_videos",
      title: t('account.videos'),
      icon: "video",
      buttonText: null
    }
  ];

  return (
    <>
      <div className="flex flex-wrap -mx-3">
        <CurrentPosition user={user}/>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
          <div
            className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
            <div className="flex flex-col justify-center h-full">
              <div className="flex justify-between">
                <span className="text-2xl font-bold mb-6">{t('layout.card')} / {t('layout.ad')}</span>
                <UserSvg/>
              </div>
              <Link href={employeeLink}>
                <a>
                  <Button className="w-2/3" size="sm">
                    {employeeButtonText}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
          <div
            className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
            <div className="flex flex-col justify-center h-full">
              <div className="flex justify-between">
                <span className="text-2xl font-bold mb-6">{user.employee.events_count} {t('account.events')}</span>
                <StarSvg/>
              </div>
              <Button className="w-2/3" size="sm">
                {t('navigation.add_new')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        {counters &&
        counters.map(({counter, title, icon, buttonText}, index) => (
          <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5" key={index}>
            <div
              className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
              <div className="flex flex-col justify-center h-full">
                <div className="flex justify-between">
                  <span className="text-2xl font-bold mb-6">{`${counter ? user[counter] : ""} ${title}`}</span>
                  {icon === "photo" ? (
                    <PhotoSvg/>
                  ) : (
                    <VideoSvg/>
                  )}
                </div>
                {buttonText && (
                  <Button className="w-2/3" size="sm">
                    {buttonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PrivateBox;
