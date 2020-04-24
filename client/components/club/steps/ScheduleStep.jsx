import React from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import { SelectGroupField, SelectField } from "UI";
import {useTranslation} from "react-i18next";
import TextField from "UI/Forms/TextField";

const ScheduleStep = () => {
  const { values } = useFormikContext();
  const {t, i18n} = useTranslation();

  let hours = [];
  let minutes = [
    "00",
    "30",
  ];
  let timeOptions = [];

  for (let i = 0; i < 24; i++) {
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
  ]

  const isStartDisabled = (day) => {
    let d = values.schedule[day]

    if (d) {
      return d && d.start === 0
    }

    return false
  }

  let startOptions = timeOptions
  startOptions.unshift({
    label: t('clubs.day_off'),
    value: 0,
  })

  return (
    <div className="px-2">
      <div className="flex flex-col -mx-4">
        <div className="mb-3">
          <span>Open Hour</span>
        </div>
        <div className="flex flex-row items-start w-1">
          <TextField
              type="time"
              name="start_time"
              label="From"
              className="mr-2"
          />

          <TextField
              type="time"
              name="end_time"
              label="To"
          />
        </div>
        {weeks.map(week => (
          <div className="flex items-center" key={week.day}>
            <div className="w-2/5 px-2">{week.name}</div>
            <div className="w-3/5 px-2">
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
      </div>
    </div>
  );
};

ScheduleStep.validationSchema = Yup.object().shape({});

export default ScheduleStep;
