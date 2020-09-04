import React, {useState} from "react";
import {Field, useField, useFormikContext} from "formik";
import { SelectGroupField, SelectField, ToggleField, DateField, Loader, LocationSearchInput } from "UI";
import {useTranslation} from "react-i18next";
import {CLUBS_SEARCH} from "queries";
import {useQuery} from "@apollo/react-hooks";

const WeekRow = ({week, schedule, startOptions, timeOptions, isStartDisabled, clubs}) => {
  const { values, setFieldValue } = useFormikContext();
  const {t, i18n} = useTranslation();
  const [alone, setAlone] = useState(!schedule.club && (!schedule.address || !schedule.address.length));
  const setAtAddress = (value) => {
    setFieldValue(`schedule.${week.day}.at_address`, value);
  };

  const timetable = (
      <SelectGroupField
        label={t('clubs.time')}
        name="time"
        className="w-full md:w-3/12a px-2  md:w-8/12 max-w-sm"
      >
        <SelectField
          className="w-full sm:w-1/2"
          inputClassName="w-full md:w-1/3"
          label=""
          name={`schedule.${week.day}.start`}
          options={startOptions}
          placeholder=""
        />
        <SelectField
          className="w-full sm:w-1/2"
          inputClassName="w-full md:w-1/3"
          label=""
          value={isStartDisabled(week.day) ? null : ""}
          name={`schedule.${week.day}.end`}
          disabled={isStartDisabled(week.day)}
          options={timeOptions}
          placeholder=""
        />
      </SelectGroupField>
  )

  return (
    <div className="flex flex-col" key={week.day}>
        <div className="flex w-full xs:flex-col md:flex-row">
            <div className="flex items-center justify-between md:w-4/12">
                <div className="md:w-1/12a px-2">{week.name}</div>
                <Field name="at_address">
                  {({ field: { value, ...rest } }) => (
                    <input type="hidden"/>
                  )}
                </Field>
                <div className="md:w-1/6a px-2">
                  <ToggleField
                    trueLabel={t('steps.alone')}
                    falseLabel={t('steps.at_club')}
                    initValue={alone}
                    onChange={(value) => setAlone(value)}
                  />
                </div>
            </div>
            <div className="w-full md:w-3/12a px-2  md:w-8/12 max-w-sm flex-row">
                {!alone &&
                  <SelectField
                    styles={{
                      marginBottom: '1.6rem'
                    }}
                    className="w-full md:w-3/12a px-2 max-w-sm"
                    inputClassName="w-full md:w-1/3"
                    label={t('schedule.select_available_club')}
                    name={`schedule.${week.day}.club_id`}
                    options={[{value: 0, label: t('schedule.add_my_location')}, ...clubs]}
                    placeholder=""
                    intValues={true}
                    onSelect={value => setAtAddress(value === 0 ?  1 : 0)}
                  />
                }
                {alone && timetable}
            </div>
        </div>

        {!alone && timetable}
      {(!alone && !!values['schedule'][week.day].at_address) &&
        <LocationSearchInput
          styles={{
            marginBottom: '.7rem'
          }}
          className="w-3/12 px-2"
          inputClassName=""
          name={`schedule.${week.day}.address`}
        />
      }
    </div>
  );
};

const AdScheduleStep = () => {
  const { values } = useFormikContext();
  const {t, i18n} = useTranslation();

  const { loading, data, refetch } = useQuery(CLUBS_SEARCH, {
    variables: {
      filters: {
        // search: '',
      }
    }
  });

  if (loading) {
    return <Loader/>
  }

  const schedule = values.schedule;

  const clubs = data.clubsSearch.map(c => ({value: `${c.id}`, label: c.name}));

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

    if (d === null || d === undefined) {
      return false;
    }

    // if (!d.available) return true;

    return d.start === 0 || d.start === 'day_off';
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
          <WeekRow
            week={week}
            schedule={schedule.find(s => s.day === week.day)}
            key={week.day}
            startOptions={startOptions}
            timeOptions={timeOptions}
            isStartDisabled={isStartDisabled}
            clubs={clubs}
          />
        ))}
        {/*<DateField
          className="w-full sm:w-1/2 lg:w-1/3"
          inputClassName="w-full md:w-1/3"
          label={t('steps.activate_date')}
          name="will_activate_at"
          placeholder={t('steps.activate_date')}
        />*/}
      </div>
    </div>
  );
};

export default AdScheduleStep;
