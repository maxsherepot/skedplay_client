import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { GET_EMPLOYEE_SCHEDULE } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { CalendarSvg, ArrowNextSvg, PhoneSvg } from "icons";
import { Loader } from "UI";
import {useTranslation} from "react-i18next";

const EmployeeSchedule = ({ employee, ...rest }) => {
  const {
    data: { schedule_period, employee_schedule: schedule } = {},
    loading
  } = useQuery(GET_EMPLOYEE_SCHEDULE, {
    variables: {
      employee_id: employee.id
    }
  });
  const [isShowPhoneId, toggleShowPhoneId] = useState(false);
  const {t, i18n} = useTranslation();

  if (loading) {
    return <Loader/>;
  }

  const getPeriodDate = day => {
    const index = schedule_period.map(p => +p.day).indexOf(day);

    return schedule_period[index] && schedule_period[index].date;
  };

  const getFirstPhone = phones => {
    const [phone] = JSON.parse(phones);

    return phone;
  };

  return (
    <>
      <div className="flex items-center">
        <div className="text-2xl font-extrabold my-5">{rest.title}</div>
        <span className="hidden sm:flex items-center ml-9">
          <span className="text-xs mr-2">{t('schedule.view_for_month')}</span>
          <CalendarSvg />
        </span>
      </div>
      <div className="bg-white text-xs sm:text-sm hd:text-base rounded-lg p-4 lg:p-12">
        {schedule &&
          schedule.map((s, i) => (
            <section className="mb-3" key={i}>
              <div className="flex">
                <span className="inline-block w-10 sm:mr-4">
                  {getPeriodDate(s.day)}
                </span>
                <span className="hidden sm:block">{s.day_name}</span>
                <span className="block sm:hidden">
                  {s.day_name.slice(0, 2)}
                </span>
              </div>
              <div className="line" />
              {s.club ? (
                <div className="flex flex-col sm:flex-row w-3/6 sm:w-2/5 sm:w-7/12">
                  <div className="flex w-1/2 text-red font-bold whitespace-no-wrap">
                    <span className="mr-3">{s.club.name}</span>
                    <ArrowNextSvg />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="flex items-center justify-start lg:justify-end">
                      <PhoneSvg className="stroke-black w-6 h-3" />
                      <span
                        className={cx("mr-2", {
                          "w-10 overflow-hidden whitespace-no-wrap": isShowPhoneId !== i
                        })}
                      >
                        {getFirstPhone(s.club.phones)}
                      </span>
                      {isShowPhoneId !== i && (
                        <span
                          className="text-red font-bold cursor-pointer whitespace-no-wrap"
                          onClick={() => toggleShowPhoneId(i)}
                        >
                          {t('schedule.view_phone')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                  <>
                    {s.available && s.start && s.start !== 'day_off' ? (
                      <div className="flex w-3/6 sm:w-2/5 sm:w-7/12">
                        <div>{s.start} — {s.end}</div>
                      </div>
                    ) : (
                        <div className="flex w-3/6 sm:w-2/5 sm:w-7/12 text-light-grey">
                          <div>{t('about.clubs.day_off')}</div>
                        </div>
                      )}
                  </>
                )}
            </section>
          ))}

        <span className="flex sm:hidden items-center mt-6">
          <span className="text-sm mr-2">{t('schedule.view_for_month')}</span>
          <CalendarSvg />
        </span>
      </div>
    </>
  );
};

EmployeeSchedule.propTypes = {
  title: PropTypes.string.isRequired,
  employee: PropTypes.object
};

export default EmployeeSchedule;
