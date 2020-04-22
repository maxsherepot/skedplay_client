import React from "react";
import { useFormikContext } from "formik";
import { SelectGroupField, SelectField, ToggleField, DateField } from "UI";
import {useTranslation} from "react-i18next";

const AdScheduleStep = () => {
  const { values } = useFormikContext();
  const {t, i18n} = useTranslation();

  let hours = [];
  let minutes = [
    "00",
  ];
  let timeOptions = [];

  for (let i = 0; i < 25; i++) {
    let h;
    if (i < 10) {
      h = `0${i}`
    } else {
      h = (i)
    }

    hours.push(h)
  }

  hours.forEach(hour => {
    minutes.forEach((minute) => {
      timeOptions.push(
        {
          label: `${hour}:${minute}`,
          value: `${hour}:${minute}`,
        }
      )
    })
  });

  const weeks = [
    {
      day: 0,
      name: t('day.sunday')
    },
    {
      day: 1,
      name: t('day.monday')
    },
    {
      day: 2,
      name: t('day.tuesday')
    },
    {
      day: 3,
      name: t('day.wednesday')
    },
    {
      day: 4,
      name: t('day.thursday')
    },
    {
      day: 5,
      name: t('day.friday')
    },
    {
      day: 6,
      name: t('day.saturday')
    }
  ];

  const isStartDisabled = (day) => {
    let d = values.schedule[day];

    if (d && !d.available) return true;

    if (d) {
      return d && (d.start === 0 || d.start === 'day_off')
    }

    return false
  };

  let startOptions = timeOptions;
  startOptions.unshift({
    label: t('about.clubs.day_off'),
    value: 'day_off',
  });

  return (
    <div className="px-2">
      <div className="flex flex-col -mx-4">
        {weeks.map(week => (
          <div className="flex items-center" key={week.day}>
            <div className="w-1/5 px-2">{week.name}</div>
            <div className="w-1/6 hd:w-2/6 px-2">
              <ToggleField name="scheduled" label={t('steps.alone')} value={true} />
            </div>
            <div className="w-2/5 hd:w-3/5 px-2">
              <SelectGroupField
                label={t('clubs.time')}
                name="time"
              >
                <SelectField
                  className="w-full sm:w-1/2 lg:w-1/3"
                  inputClassName="w-full md:w-1/3"
                  label=""
                  name={`schedule.${week.day}.start`}
                  options={startOptions}
                  placeholder=""
                />
                <SelectField
                  className="w-full sm:w-1/2 lg:w-1/3"
                  inputClassName="w-full md:w-1/3"
                  label=""
                  value={isStartDisabled(week.day) ? null : ""}
                  name={`schedule.${week.day}.end`}
                  disabled={isStartDisabled(week.day)}
                  options={timeOptions}
                  placeholder=""
                />
              </SelectGroupField>
            </div>
          </div>
        ))}
        <DateField
          className="w-full sm:w-1/2 lg:w-1/3"
          inputClassName="w-full md:w-1/3"
          label={t('steps.activate_date')}
          name="will_activate_at"
          placeholder={t('steps.activate_date')}
        />
      </div>
    </div>
  );
};

export default AdScheduleStep;
