import React, {useState} from "react";
import Link from 'components/SlashedLink'
import {Avatar, Button, Loader, SelectField, LocationSearchInput, CheckboxField} from "UI";
import {UserSvg, StarSvg, PhotoSvg, VideoSvg} from "icons";
import {useTranslation} from "react-i18next";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from 'moment';
import * as Yup from "yup";
import AccountActivate from "./AccountActivate";
import {Field, Formik, useFormikContext} from "formik";
import {UPDATE_EMPLOYEE_CURRENT_POSITION} from 'queries';
import {UPLOAD_VERIFY_PHOTO} from "queries/userQuery";
import AlertTriangleSvg from "components/icons/AlertTriangleSvg";

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

  // if (loading) {
  //   return <Loader/>
  // }

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
      <div className="text-lg font-bold mb-2 hidden">
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
        <div className="hidden">
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

const GirlRow = ({ employee, soon, active, isFormFilled }) => {
    const {t, i18n} = useTranslation();
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const avatar = (employee.photos || []).length ? employee.photos[0].thumb_url : undefined
    isFormFilled = true
    return (
      <div className="flex flex-col sm:flex-row items-center my-2">
          <Avatar className="w-10 h-10 sm:mr-2" isEmpty={!avatar} src={avatar}/>

         <div className="flex flex-col justify-between">
             <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                  <span className={"hidden sm:block h-2 w-2 mr-2 rounded-full" + (active ? " bg-dark-green " : " bg-red ")} /> <div className=" text-xl"> {employee && employee.name}</div>
                 {active ? (
                     <div className="flex items-center ml-2">
                         <div className="bg-dark-green text-white text-xs rounded-full whitespace-no-wrap px-3">
                             30.09.20
                         </div>
                         {soon && (
                           <div className="bg-black text-white text-xs rounded-full whitespace-no-wrap px-3 py-1 ml-2">
                               {t('common.coming_soon')}
                           </div>
                         )}
                     </div>
                 ) : (
                   <div className="flex items-center ml-2">
                       <div className="bg-light-grey text-white text-xs rounded-full whitespace-no-wrap px-3">
                           {t('common.not_active')}
                       </div>
                   </div>
                 )}
             </div>

             <div className="flex flex-col sm:flex-row items-center mt-3 sm:ml-2">
                 <Link href={"/account/ad"}>
                     <a>
                         <Button className="px-6" size="xxs" outline style={{ color: "#000" }}>
                             {t('common.edit')}
                         </Button>
                     </a>
                 </Link>
                 {
                     isFormFilled &&
                         <Link href={"/account/events/create/"}>
                             <a>
                                 <Button className="px-6 whitespace-no-wrap mt-2 sm:mt-0 sm:ml-2" size="xxs" outline style={{ color: "#000" }}>
                                     New Event
                                 </Button>
                             </a>
                         </Link>
                 }

                 {
                     !active && isFormFilled &&
                         <a>
                             <Button level="green" onClick={() => setPaymentOpen(true)} className="px-6 whitespace-no-wrap mt-2 sm:mt-0 sm:ml-2 flex items-center" size="xxs" outline style={{ color: "#000" }}>
                                 {t('common.active_now')}
                             </Button>
                         </a>
                 }
                 <AccountActivate open={isPaymentOpen} onClose={() => setPaymentOpen(false)}/>
             </div>
         </div>

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

  const isFormFilled = getFromLS("employee_form_state") === "done"

  return (
    <>
      <div className="flex flex-wrap -mx-3">
        <CurrentPosition user={user}/>
      </div>

      <div className="p-5 hd:p-10 border-light-grey border rounded-lg  shadow mb-5">
          <div className="hidden absolute inset-0 flex justify-end m-10">
              <UserSvg />
          </div>
          <div className="flex">
              <div className="flex flex-col w-full">
                  <span className="text-xl font-medium">{t('account.my_cards')}</span>

                 <GirlRow key={user.employee.id} employee={user.employee} active={user.status === 1} isFormFilled={isFormFilled}/>
                </div>
            </div>
      </div>

      {
          !user.verify_photo &&
              <div className="px-5 py-3 hd:px-10 relative border-light-grey border rounded-lg mb-5" style={{maxWidth: 600}}>
                  <div className="flex">
                      <div className="flex flex-col w-full">
                          <div className="flex justify-between">
                               <span className="text-xl font-medium">{t('account.verify_your_account')}</span>
                               <AlertTriangleSvg />
                          </div>

                          <VerifyMessage user={user}/>
                        </div>
                    </div>
              </div>
      }


      <div className="hidden flex flex-wrap -mx-3">
        <div className="px-3 w-full md:w-1/2 hd:w-1/3">
          <div
            className="hidden p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
            <div className="flex flex-col justify-center h-full">
              <div className="flex justify-between">
                <span className="text-2xl font-bold mb-6">{t('layout.card')} / {t('layout.ad')}</span>
                <UserSvg/>
              </div>
              <Link href={employeeLink}>
                <a>
                  <Button className="px-4 btn-size__div" size="sm">
                    {employeeButtonText}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className=" hidden px-3 w-full mb-5">
          <div
            className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
            <div className="flex flex-col justify-center h-full">
              <div className="flex justify-between">
                <span className="text-2xl font-bold mb-6">{user.employee.events_count} {t('account.events')}</span>
                <StarSvg/>
              </div>
                <div>
                    <a href="/account/events/create/">
                     <Button className="px-4" size="sm">
                       {t('navigation.add_new')}
                     </Button>
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex flex-wrap -mx-3">
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



const VerifyMessage = ({user}) => {
  const {t} = useTranslation();
  const [uploadVerifyPhoto] = useMutation(UPLOAD_VERIFY_PHOTO);
  let date, time;

  if (user.verify_photo) {
    let dateUploadPhoto = user.verify_photo['created_at'];

    date = moment(dateUploadPhoto.slice(0, 10), 'YYYY-MM-DD').format('DD-MM-YYYY');
    time = dateUploadPhoto.slice(11, 16);
  }

  const handleSubmit = async verifyFile => {
    try {
      const [verify_photo] = verifyFile.target.files;

      await uploadVerifyPhoto({
        variables: {
          verify_photo: verify_photo,
          collection: 'verify-photo'
        },
      });

      Router.reload();

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
    <>
      {user.verify_photo ? (
       <div className="flex flex-row pl-3 items-center verify-message-div__message">
         <div className="flex items-center justify-center md:pl-0 md:pr-0 lg:pr-0 lg:pl-0 xl:pl-15 sm:pl-0 xl:pr-15 lg:w-full">
          <div className="ml-3 py-2">
            <span className="font-bold flex flex-col">
              {t('account.added_verify_photo', {date: `${date}`, time: `${time}`})}
            </span>
          </div>
         </div>
       </div>
      ) : (
          <div className="flex flex-col mt-2">
              <span className="">{t('account.add_pass_or_photo')}</span>
                  <div className="py-4 my-auto w-full btn-verify__div mt-0">
                    <label htmlFor="verifyFile" className="inline-block">
                        <span
                          className="flex items-center border bg-red  border-red text-white text-xxs rounded-full px-4
                                     sm:px-3 md:px-6 hover:cursor-pointer" style={{height: 30}}>
                          {t('account.upload_verify_photo')}
                        </span>
                    </label>
                    <input
                      className="c-account__avatar-input"
                      type="file"
                      id="verifyFile"
                      name="Upload Verify Photo"
                      onChange={handleSubmit}
                    />
                  </div>

          </div>
      )}
    </>
  )

};

const getFromLS = (key) => {
    if ((global || window).localStorage) {
        return (global || window).localStorage.getItem(key)
    }
};

export default PrivateBox;
