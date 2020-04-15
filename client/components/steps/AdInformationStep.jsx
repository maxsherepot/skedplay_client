import React from "react";
import { GET_EMPLOYEE_PARAMETERS, CITIES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { TextField, PhoneField, DateRawField, SelectField, TextAreaField, LocationSearchInput, Loader } from "UI";
import {useTranslation} from "react-i18next";
import {GET_RACE_TYPES} from "queries/employeeQuery";

const AdInformationStep = () => {
  const {t, i18n} = useTranslation();

  const { data: { parameters } = {} } = useQuery(
    GET_EMPLOYEE_PARAMETERS
  );

  const { data: { employee_race_types: raceTypes } = {}, racesTypeLoading } = useQuery(GET_RACE_TYPES);

  const { loading: citiesLoading, data: { cities } = {} } = useQuery(
    CITIES
  );

  if (citiesLoading || racesTypeLoading) {
    return <Loader/>;
  }

  return (
    <>
      <div className="text-4xl font-extrabold mb-5">{t('account.links.information')}</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          <TextField
            className="w-full sm:w-1/3 px-2"
            inputClassName="w-1/3"
            label={t('common.name')}
            name="name"
          />

          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('employees.gender_type')}
            name="type"
            options={[
                {
                    label: t('steps.gender_type_ts'),
                    value: 1
                }
            ]}
            placeholder=""
          />

          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('common.race_nationality')}
            name="race_type_id"
            options={(raceTypes || []).map(e => ({label: e.name, value: parseInt(e.id)}))}
            placeholder=""
          />

          {/*<TextField*/}
          {/*  className="w-full sm:w-1/3 px-2"*/}
          {/*  inputClassName="w-1/3"*/}
          {/*  label="Birthday"*/}
          {/*  name="birthday"*/}
          {/*  placeholder="21 jule 1989"*/}
          {/*/>*/}

          {/*<DateRawField
            className="w-full sm:w-1/3 px-2"
            inputClassName="w-1/3"
            label={t('register.birth')}
            name="birthday"
          />*/}

          {/* <GroupCheckbox
            className="w-full sm:w-1/3 px-2"
            label="Service for"
            name="service_for"
            items={[
              {
                name: "Man",
                value: "man"
              },
              {
                name: "Woman",
                value: "woman"
              },
              {
                name: "Couple",
                value: "couple"
              }
            ]}
          /> */}
        </div>

        <div className="flex flex-wrap -mx-4">
          {/*<SelectField*/}
          {/*  className="w-full sm:w-1/2 lg:w-1/3 px-2"*/}
          {/*  inputClassName="w-full md:w-1/3"*/}
          {/*  label={t('common.gender')}*/}
          {/*  name="gender"*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      label: t('common.male'),*/}
          {/*      value: 1*/}
          {/*    },*/}
          {/*    {*/}
          {/*      label: t('common.female'),*/}
          {/*      value: 2*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*  placeholder=""*/}
          {/*/>*/}

          <TextAreaField
            className="w-full px-2"
            rows="5"
            label={t('steps.about_yourself')}
            name="description"
          />
        </div>
      </div>

      <div className="text-4xl font-extrabold my-5">{t('contacts_popup.your_working_location')}</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          <TextField
            className="w-1/2 md:w-1/6 px-2"
            inputClassName="w-1/2 md:w-1/6"
            label={t('clubs.index')}
            name="index"
          />

          {/*<TextField*/}
          {/*  className="w-1/2 md:w-2/6 px-2"*/}
          {/*  inputClassName="w-1/2 md:w-2/6"*/}
          {/*  label="City"*/}
          {/*  name="city_id"*/}
          {/*/>*/}

          <SelectField
            className="w-1/2 md:w-2/6 px-2"
            inputClassName="w-1/2 md:w-2/6"
            label={t('clubs.city')}
            name="city_id"
            options={cities.map(c => ({value: c.id, label: c.name}))}
            placeholder=""
          />

          {/*<TextField*/}
          {/*  className="w-full md:w-3/6 px-2"*/}
          {/*  inputClassName="w-full md:w-3/6"*/}
          {/*  label="Address"*/}
          {/*  name="address"*/}
          {/*/>*/}

          <LocationSearchInput/>
        </div>

        <div className="flex flex-wrap -mx-4">
          {/*<PhoneField*/}
          {/*  className="w-full md:w-1/3 px-2"*/}
          {/*  inputClassName="w-full md:w-1/3"*/}
          {/*  label={t('clubs.phone_exampl')}*/}
          {/*  name="phone"*/}
          {/*  placeholder="+41 79"*/}
          {/*/>*/}

          {/*<TextField*/}
          {/*  className="w-full md:w-1/3 px-2"*/}
          {/*  inputClassName="w-full md:w-1/3"*/}
          {/*  label={t('clubs.mail')}*/}
          {/*  name="email"*/}
          {/*/>*/}

          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('layout.webpage')}
            name="website"
          />
        </div>
      </div>

      <div className="flex items-end my-5">
        <div className="text-4xl font-extrabold leading-none">
          {t('steps.personal_info')}
        </div>
        <div className="ml-6">{t('steps.optional')}</div>
      </div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          {parameters &&
            parameters.map(({ id, display_name, options }) => (
              <SelectField
                key={id}
                className="w-full sm:w-1/3 md:w-1/6 px-2"
                inputClassName="w-full md:w-1/3"
                label={display_name}
                name={`parameters.${id}`}
                value=""
                options={options}
                placeholder=""
              />
            ))}
        </div>
        {/* Todo: */}
        {/* <LangSelector /> */}
      </div>
    </>
  );
};

export default AdInformationStep;
