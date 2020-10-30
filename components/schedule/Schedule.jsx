import React from "react";
import PropTypes from "prop-types";
import { CalendarSvg } from "icons";
import { useTranslation } from "react-i18next";

const Schedule = ({ schedule, schedule_period, title }) => {
  const getPeriodDate = day => {
    const index = schedule_period.map(p => +p.day).indexOf(day);

    return schedule_period[index] && schedule_period[index].date;
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="flex items-center mt-5 md:mt-0">
        <div className="text-2xl font-bold mb-5">{title}</div>
      </div>
      <div className="bg-white text-xs sm:text-sm hd:text-base rounded-lg p-4 lg:p-12">
        {schedule &&
          schedule.map((s, i) => (
            <section className="mb-3" key={s.id}>
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
              {s.available ? (
                <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12">
                  <div>
                    {s.start} — {s.end}
                  </div>
                </div>
              ) : (
                  <div className="flex justify-end w-3/6 sm:w-2/5 sm:w-7/12 text-light-grey">
                    <div>{t('about.clubs.day_off')}</div>
                  </div>
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

Schedule.propTypes = {
  title: PropTypes.string.isRequired,
  schedule: PropTypes.array.isRequired,
  schedule_period: PropTypes.array.isRequired
};

export default Schedule;
