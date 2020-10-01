import React, {useState} from 'react';
import {Formik, useFormikContext} from "formik";
import * as Yup from "yup";
import {BlackPlusSvg} from "icons";
import {
  Button,
  TextField,
  SelectField,
  TextAreaField,
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
import {GET_EVENT} from "queries/eventQuery";
import FileField from "UI/Forms/FileField";
import {useRouter} from "next/router";
import {GET_ME} from "queries/userQuery";

const EventForm = ({initialValues, onSubmit, update}) => {
  const {t} = useTranslation();
  const [mode, setMode] = useState(initialValues.mode || "1");
  const {query: {eid}} = useRouter();
  const {data: {event_types: eventTypes} = {}, eventTypesLoading} = useQuery(EVENT_TYPES);
  const {
    data: { me } = {},
    loadingMe
  } = useQuery(GET_ME);

  const {data: {event} = {}, loading} = useQuery(GET_EVENT, {
    variables: {
      id: eid
    }
  });

  if (loading || eventTypesLoading || loadingMe) {
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

  let defaultAddress = event && event.address ? event.address : (me && me.employee && me.employee.address || '');

  //let setDefaultAddress = defaultAddress.endsWith(', Switzerland') ? defaultAddress : '';

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
        event_type_id: Yup.number().required('Type'),
        start_time: Yup.string().required(),
        address: Yup.string().required(),
        mainPhoto: Yup.string().nullable().required(),
      })}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, status, errors}) => (
        <form onSubmit={handleSubmit} className="new-event-form">
          {isSubmitting && <Loader/>}

          <div className="px-2">
            {status && (
              <div className="text-dark-green text-white px-1 mb-3">
                {status}
              </div>
            )}
            <div className="row flex xs:flex-col sm:flex-row">
              <TextField label={t('account.events_actions.title')} name="title" className="w-full sm:w-2/3 inline-block"/>

              <SelectField
                  label={t('account.events_actions.type')}
                  name="event_type_id"
                  options={(eventTypes || []).map(e => ({label: e.name, value: parseInt(e.id)}))}
                  placeholder=""
                  className="align-middle pb-4 w-full sm:w-1/4 sm:ml-3 inline-block"
              />
            </div>

            {/*<TextField label={t('steps.price')} name="price"/>*/}

            <RadioField
              items={[
                {
                  name: t('account.events_actions.regular'),
                  value: 1,
                  class: 'mr-4 sm:mr-20 mb-2'
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
                  <div className="flex flex-wrap ">
                      {dayCheckboxes.map((day, i) => (
                        <CheckboxField
                          key={day.value}
                          className="text-lg align-middle mr-4 sm:mr-8"
                          labelClass="inline-block mb-2"
                          label={day.label}
                          name={`days[${day.value}]`}
                        />
                      ))}
                  </div>
                </>
                :
                <div className="flex flex-col sm:flex-row">
                  <DateField
                    name="start_date"
                    label={t('account.events_actions.start_date.label')}
                    placeholder={t('account.events_actions.start_date.placeholder')}
                    className="sm:mr-5"
                    minDateTomorrow={true}
                  />

                  <DateField
                    name="end_date"
                    label={t('account.events_actions.end_date.label')}
                    placeholder={t('account.events_actions.end_date.placeholder')}
                    minDateTomorrow={true}
                  />
                </div>
              }
            </div>

            <TextField
              type="time"
              name="start_time"
              label="Start time"
              />

          <div className="flex xs:flex-col sm:flex-row w-full sm:-mx-3">
              <TextAreaField
                  rows={6}
                  label={t('account.events_actions.desc')}
                  name="description"
                  className="relative sm:px-3 w-full sm:w-3/5"
                  placeholder=""
                  textLength={255}
              />
              <FileField
                  className="sm:px-3 w-full sm:w-2/5"
                  label="Photo for your Event"
                  name="mainPhoto"
                  preview={event && event.mainPhoto && event.mainPhoto.url}
                  secondLabel="  "
              />
            </div>

            <LocationSearchInput
              className="w-full"
              initAddress={defaultAddress}
              defaultValue={defaultAddress}
            />

            {initialValues.club &&
              <EventEmployeesField clubEmployees={initialValues.club.employees} eventEmployees={initialValues.employees}/>
            }

            {/*<div className="flex flex-wrap mb-4 mt-4">*/}
            {/*  <MultiPhotoField */}
            {/*    name="photos" */}
            {/*    label="" */}
            {/*    initialValues={initialValues.photos} */}
            {/*    selectable={false}*/}
            {/*    trigger={*/}
            {/*      <Button*/}
            {/*        className="px-3"*/}
            {/*        level="primary-black"*/}
            {/*        outline*/}
            {/*        size="sm"*/}
            {/*        type="button"*/}
            {/*      >*/}
            {/*        <div className="flex items-center">*/}
            {/*          <BlackPlusSvg/>*/}
            {/*          <span className="ml-2">{t('common.from_device')}</span>*/}
            {/*        </div>*/}
            {/*      </Button>*/}
            {/*    }*/}
            {/*  >*/}
            {/*  </MultiPhotoField>*/}
            {/*</div>*/}

            <Button
              type="submit"
              className="px-8 mt-4"
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
