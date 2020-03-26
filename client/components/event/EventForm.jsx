import React, {useState} from 'react';
import {Formik, useFormikContext} from "formik";
import * as Yup from "yup";
import {BlackPlusSvg} from "icons";
import {
  Button,
  TextField,
  SelectField,
  TextAreaField,
  MultiPhotoField,
  RadioField,
  CheckboxField,
  DateField,
  LocationSearchInput,
  EventEmployeesField,
  Loader,
} from "UI";
import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/react-hooks";
import {EVENT_TYPES} from 'queries';

const EventForm = ({initialValues, onSubmit, update}) => {
  const {t} = useTranslation();
  const [mode, setMode] = useState(initialValues.mode || "1");

  const {data: {event_types: eventTypes} = {}, eventTypesLoading} = useQuery(EVENT_TYPES);

  if (eventTypesLoading) {
    return <Loader/>
  }

  const dayCheckboxes = [
    {label: t('common.days_short.sun'), value: 0},
    {label: t('common.days_short.mon'), value: 1},
    {label: t('common.days_short.tue'), value: 2},
    {label: t('common.days_short.wed'), value: 3},
    {label: t('common.days_short.thu'), value: 4},
    {label: t('common.days_short.fri'), value: 5},
    {label: t('common.days_short.sat'), value: 6},
  ];

  let days = [];

  for (let i in dayCheckboxes) {
    days.push((initialValues.days || []).findIndex(d => parseInt(d) === dayCheckboxes[i].value) !== -1);
  }

  return (
    <Formik
      initialValues={{...initialValues, days}}
      validationSchema={Yup.object().shape({
        title: Yup.string().required(),
        mode: Yup.string().required(),
        description: Yup.string().required(),
        event_type_id: Yup.string().required(),
        address: Yup.string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, status, errors}) => (
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            {status && (
              <div className="text-dark-green text-white px-1 mb-3">
                {status}
              </div>
            )}

            <TextField label={t('account.events_actions.title')} name="title"/>

            <SelectField
              label={t('account.events_actions.type')}
              name="event_type_id"
              options={(eventTypes || []).map(e => ({label: e.display_name, value: parseInt(e.id)}))}
              placeholder=""
            />

            <TextField label={t('steps.price')} name="price"/>

            <RadioField
              items={[
                {
                  name: t('account.events_actions.regular'),
                  value: 1,
                  class: 'mr-20 mb-2'
                },
                {
                  name: t('account.events_actions.period_or_day'),
                  value: 2,
                },
              ]}
              name="mode"
              defaultValue={{name: t('account.events_actions.regular'), value: 1}}
              handleChange={setMode}
            />

            <div className="my-5">
              {parseInt(mode) === 1 ?
                <>
                  <div className="text-red">
                    {errors.days}
                  </div>

                  {dayCheckboxes.map((day, i) => (
                    <CheckboxField
                      key={day.value}
                      className="text-lg mr-10"
                      labelClass="inline-block mb-2"
                      label={day.label}
                      name={`days[${day.value}]`}
                    />
                  ))}
                </>
                :
                <div className="flex">
                  <DateField
                    name="start_date"
                    label={t('account.events_actions.start_date.label')}
                    placeholder={t('account.events_actions.start_date.placeholder')}
                    className="mr-5"
                  />

                  <DateField
                    name="end_date"
                    label={t('account.events_actions.end_date.label')}
                    placeholder={t('account.events_actions.end_date.placeholder')}
                  />
                </div>
              }
            </div>

            <TextAreaField rows={6} label={t('account.events_actions.desc')} name="description"/>

            <LocationSearchInput
              className="w-full"
            />

            {initialValues.club &&
              <EventEmployeesField clubEmployees={initialValues.club.employees} eventEmployees={initialValues.employees}/>
            }

            <div className="flex flex-wrap mb-4 mt-4">
              <MultiPhotoField name="photos" label="" initialValues={initialValues.photos} selectable={false}>
                <Button
                  className="px-3"
                  level="primary-black"
                  outline
                  size="sm"
                  type="button"
                >
                  <div className="flex items-center">
                    <BlackPlusSvg/>
                    <span className="ml-2">{t('common.from_device')}</span>
                  </div>
                </Button>
              </MultiPhotoField>
            </div>

            <Button
              type="submit"
              className="px-8"
              size="sm"
              disabled={isSubmitting}
            >
              {!!update ? t('common.save') : t('common.create')}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
};

export default EventForm;