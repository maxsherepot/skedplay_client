import React from "react";
import * as Yup from "yup";
import { TextField, SelectField, FileField, TextAreaField, ArrayField } from "UI";

const InformationStep = ({ club }) => {
  return (
    <>
      <div className="text-4xl font-extrabold">Information</div>
      <div className="flex w-full -mx-3">
        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="Club name"
          name="name"
          placeholder=""
        />

        <SelectField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="Type"
          name="club_type_id"
          options={[
            { label: "Sauna club", value: 1 },
            { label: "Night club", value: 2 }
          ]}
          placeholder=""
        />
      </div>

      <div className="flex w-full -mx-3">
        <TextAreaField
          className="relative px-3 w-2/3"
          label="About club"
          name="description"
          placeholder=""
          rows={7}
          textLength={3000}
        />
        <FileField
          className="px-3 w-1/3"
          label="Logotype"
          name="logotype"
          required
          preview={club.logo && club.logo.url}
        />
      </div>

      <div className="text-4xl font-extrabold mt-12">
        Club location and contacts
      </div>

      <div className="flex w-full -mx-3">
        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="Index"
          name="index"
          placeholder=""
        />

        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="City"
          name="city"
          placeholder=""
        />

        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="Adress"
          name="address"
          placeholder=""
        />
      </div>

      <div className="flex w-full -mx-3">
        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="Mail"
          name="email"
          placeholder=""
        />

        <TextField
          className="px-3 w-1/3"
          inputClassName="w-1/3"
          label="Webpage"
          name="website"
          placeholder=""
        />
      </div>

        <div className="flex w-full -mx-3">
            <ArrayField
                className="w-full"
                label="Phone (example +4176 251-15-22)"
                name="phones"
                placeholder="+4179"
                phones={true}
            />
        </div>
    </>
  );
};

InformationStep.validationSchema = Yup.object().shape({
  description: Yup.string().required(),
  index: Yup.string().nullable().required(),
  city: Yup.string().nullable().required(),
  address: Yup.string().required(),
  email: Yup.string().required(),
  website: Yup.string().required()
});

export default InformationStep;
