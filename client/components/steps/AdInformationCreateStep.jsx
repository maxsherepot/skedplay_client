import React from "react";
import {GET_EMPLOYEE_PARAMETERS, CITIES} from "queries";
import {useQuery} from "@apollo/react-hooks";
import {TextField, PhoneField, DateRawField, SelectField, TextAreaField, LocationSearchInput, Loader, GroupCheckbox} from "UI";
import {useTranslation} from "react-i18next";
import {GET_RACE_TYPES} from "queries/employeeQuery";
import translation from "services/translation";
import LangSelector from "components/ad/LangSelector";
import {GET_CLUB} from "queries/clubQuery";
import {useRouter} from "next/router";

const AdInformationCreateStep = () => {
  const {t, i18n} = useTranslation();

  const {data: {parameters} = {}} = useQuery(
    GET_EMPLOYEE_PARAMETERS
  );

  const {data: {employee_race_types: raceTypes} = {}, racesTypeLoading} = useQuery(GET_RACE_TYPES);
  const {query: {cid}} = useRouter();
  const {data: {club} = {}, clubLoading} = useQuery(GET_CLUB, {
        variables: {
            id: cid
        },
        skip: !cid
  });

  const {loading: citiesLoading, data: {cities} = {}} = useQuery(
    CITIES
  );

  if (citiesLoading || racesTypeLoading || clubLoading) {
    return <Loader/>;
  }

  return (
    <>
      <div className="text-2xl font-bold mb-5 scale">{t('account.links.information')}</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4 scale">
          <TextField
            className="w-full sm:w-1/3 px-2"
            inputClassName="w-1/3"
            label={t('common.name')}
            name="name"
          />

          <DateRawField
            className="w-full sm:w-1/3 px-2"
            inputClassName="w-1/3"
            label={t('register.birth')}
            name="birthday"
          />

          <GroupCheckbox
            className="w-full sm:w-1/3 px-2"
            label={t('common.service_for')}
            name="service_for"
            items={[
              {
                name: t('common.man'),
                value: 1
              },
              {
                name: t('common.woman'),
                value: 2
              },
              {
                name: t('common.couple'),
                value: 3
              }
            ]}
          />
        </div>

        <div className="flex flex-wrap -mx-4 scale">
          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('common.gender')}
            name="gender"
            options={[
              {
                label: t('common.male'),
                value: 1
              },
              {
                label: t('common.female'),
                value: 2
              }
            ]}
            placeholder=""
          />

          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('steps.category')}
            name="type"
            options={[
                {
                    label: t('layout.girls'),
                    value: 1
                },
                {
                    label: t('steps.gender_type_trans'),
                    value: 2
                },
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

          <TextAreaField
            className="w-full px-2"
            rows="5"
            label={t('steps.about_yourself')}
            name="description"
          />
        </div>
      </div>

      <div className="text-2xl font-bold my-5 scale">{t('contacts_popup.your_working_location')}</div>

      <div className="px-2 scale">
        <div className="flex flex-wrap -mx-4">
          <LocationSearchInput
              initAddress={club && club.address || ''}
          />

          <TextField
            className="w-1/2 md:w-1/6 px-2"
            inputClassName="w-1/2 md:w-1/6"
            label={t('clubs.index')}
            name="index"
          />

          {/*<SelectField*/}
          {/*  className="w-1/2 md:w-2/6 px-2"*/}
          {/*  inputClassName="w-1/2 md:w-2/6"*/}
          {/*  label={t('clubs.city')}*/}
          {/*  name="city_id"*/}
          {/*  options={cities.map(c => ({value: c.id, label: c.name}))}*/}
          {/*  placeholder=""*/}
          {/*/>*/}
        </div>

        <div className="flex flex-wrap -mx-4">
          <PhoneField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('clubs.phone_exampl')}
            name="phone"
            defaultValue={club && club.phones.slice(2,17) || ''}
            placeholder={club && club.phones.slice(2,17) || ''}
          />

          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('clubs.mail')}
            name="email"
            value={club && club.email || ''}
          />

          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label={t('layout.webpage')}
            name="website"
            placeholder="www.example.com"
            value={club && club.website || ''}
          />
        </div>
      </div>

      <div className="flex items-end my-5 scale">
        <div className="text-2xl font-bold leading-none">
          {t('steps.personal_info')}
        </div>
        <div className="ml-6">{t('steps.optional')}</div>
      </div>

      <div className="px-2 scale">
        <div className="flex flex-wrap -mx-4">
          {parameters &&
          parameters.map(({id, name, options}) => (
            <SelectField
              key={id}
              className="w-full sm:w-1/3 md:w-1/6 px-2"
              inputClassName="w-full md:w-1/3"
              label={translation.getLangField(name, i18n.language)}
              name={`parameters.${id}`}
              value=""
              options={options.map(o => ({value: o.id, label: translation.getLangField(o.value, i18n.language)}))}
              placeholder=""
            />
          ))}
        </div>

        <LangSelector />
      </div>
    </>
  );
};

export default AdInformationCreateStep;
