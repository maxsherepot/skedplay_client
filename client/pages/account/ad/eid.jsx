import React, {useState} from "react";
import redirect from "lib/redirect";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import StepBox from "components/StepBox";
import { EditEmployeeBox } from "components/employee";
import {
  GET_EMPLOYEE, UPDATE_EMPLOYEE_CURRENT_POSITION,
} from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import { getLayout } from "components/account/AccountLayout";
import {useTranslation} from "react-i18next";
import { Loader, LocationSearchInput, SelectField, Button, CheckboxField } from "UI";
import Link from 'components/SlashedLink'
import { ArrowBack } from "UI";
import EditEmployeeHeader from "components/employee/EditEmployeeHeader";
import moment from "moment";
import {Formik} from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";

const CurrentPosition = ({employee: inputEmployee}) => {
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
        id: inputEmployee.id,
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
        employee: inputEmployee.id,
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
    <div className="xs:px-0 hd:w-7/12 mx-auto px-8 hd:px-0 pt-12 md:px-8 mb-5 hidden">
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

const AccountAdEdit = ({user}) => {
  const {t, i18n} = useTranslation();
  const {query: {eid}} = useRouter();

  const employeeId = eid.replace('/', '');

  const { data: { employee } = {}, loading, refetch} = useQuery(GET_EMPLOYEE, {
    variables: {
      id: employeeId
    }
  });

  const Breadcrumbs = ({employee}) => (
    <div className="">
      <div className="flex items-center py-4 scale">
        <ArrowBack back className=""/>
        <div className="ml-10 hidden sm:block">
          <Link href="/account">
            <a className="text-red hover:text-pink">{t('account.my_account')}</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          {employee.name}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="container no-scale">
      <Breadcrumbs employee={employee}/>

      <div className="bg-white shadow rounded-lg p-4 sm:p-8">
        <EditEmployeeHeader
          user={user}
          employee={employee}
          refetchEmployee={refetch}
          classes="flex items-center flex-wrap w-full md:w-6/12 justify-center xl:flex-no-wrap xl:justify-start border border-divider p-3 mx-8 mt-6 rounded-lg hd:w-7/12 hd:mx-auto hd:justify-start lg:ml-20 font-minimize"
        />

        <div className="flex flex-wrap -mx-3">
          <CurrentPosition employee={employee}/>
        </div>

        <EditEmployeeBox employee={employee} refetchEmployee={refetch} />
      </div>
    </div>
  );
};

const getFromLS = (key) => {
    if ((global || window).localStorage) {
        return (global || window).localStorage.getItem(key)
    }
};
// AccountAdEdit.getLayout = getLayout;

AccountAdEdit.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    redirect(ctx, "/login");
  }

  return {
    user,
    className: "lg:w-3/5 py-12"
  };
};

export default AccountAdEdit;
