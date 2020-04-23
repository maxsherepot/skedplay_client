import React from "react";
import * as Yup from "yup";
import { TextField, SelectField, FileField, TextAreaField, ArrayField, LocationSearchInput, Loader } from "UI";
import {useQuery} from "@apollo/react-hooks";
import { CITIES } from "queries";
import {useTranslation} from "react-i18next";
import {ALL_CLUB_TYPES} from "queries/clubQuery";
import PhoneField from "UI/Forms/PhoneField";

const InformationStep = ({ club }) => {
  const { loading: citiesLoading, data: { cities } = {} } = useQuery(
    CITIES
  );

  const {loadingClubTypes, data: {club_types} = {}} = useQuery(ALL_CLUB_TYPES);

  const {t, i18n} = useTranslation();

  if (citiesLoading || loadingClubTypes) {
    return <Loader/>;
  }

  return (
    <>
      <div className="text-4xl font-extrabold">{t('clubs.information')}</div>
      <div className="flex w-full -mx-3">
        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label={t('clubs.club_name')}
          name="name"
          placeholder=""
        />

        <SelectField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label={t('clubs.type')}
          name="club_type_id"
          options={(club_types || []).map(c => ({value: parseInt(c.id), label: c.name}))}
          placeholder=""
        />
      </div>

      <div className="flex w-full -mx-3">
        <TextAreaField
          className="relative px-3 w-2/3"
          label={t('clubs.about_club')}
          name="description"
          placeholder=""
          rows={7}
          textLength={3000}
        />
        <FileField
          className="px-3 w-1/3"
          label={t('clubs.logotype')}
          name="logotype"
          preview={club.logo && club.logo.url}
        />
      </div>

      <div className="text-4xl font-extrabold mt-12">
        {t('clubs.club_location_and_contacts')}
      </div>

      <div className="flex w-full -mx-3">
        <LocationSearchInput/>

        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label={t('clubs.index')}
          name="index"
          placeholder=""
        />

        <SelectField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label={t('clubs.city')}
          name="city_id"
          options={cities.map(c => ({value: c.id, label: c.name}))}
          placeholder=""
        />
      </div>

      <div className="flex w-full -mx-3">
        <TextField
          className="px-2 w-3/6"
          inputClassName="w-1/3"
          label={t('register.mail')}
          name="email"
          placeholder=""
        />

        <TextField
          className="px-3 w-2/3"
          inputClassName="w-1/3"
          label={t('layout.webpage')}
          name="website"
          placeholder=""
        />
      </div>
        <div className="flex w-full -mx-3">
            {/*<ArrayField*/}
            {/*    className="w-full"*/}
            {/*    label={t('clubs.phone_exampl')}*/}
            {/*    name="phones"*/}
            {/*    placeholder="+4179"*/}
            {/*    phones={true}*/}
            {/*/>*/}
            <PhoneField
                className="px-3 w-3/6"
                inputClassName="w-1/3"
                label={t('clubs.phone_exampl')}
                name="phones"
                placeholder="+4179"
            />
        </div>
    </>
  );
};

InformationStep.validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  index: Yup.string(),
  city_id: Yup.number(),
  address: Yup.string().required(),
  phones: Yup.string(),
  email: Yup.string().email().required(),
  website: Yup.string().url().nullable()
});

export default InformationStep;
