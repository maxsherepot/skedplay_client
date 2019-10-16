import React from "react";
import { GET_EMPLOYEE_PARAMETERS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { TextField, SelectField, TextAreaField } from "UI";

const AdInformationStep = () => {
  const { data: { parameters } = {} } = useQuery(
    GET_EMPLOYEE_PARAMETERS
  );

  return (
    <>
      <div className="text-4xl font-extrabold mb-5">Information</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          <TextField
            className="w-full sm:w-1/3 px-2"
            inputClassName="w-1/3"
            label="Name"
            name="name"
          />

          <TextField
            className="w-full sm:w-1/3 px-2"
            inputClassName="w-1/3"
            label="Birthday"
            name="birthday"
            placeholder="21 jule 1989"
          />

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
          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Gender"
            name="gender"
            options={[
              {
                label: "Male",
                value: 1
              },
              {
                label: "Female",
                value: 2
              }
            ]}
            placeholder=""
          />

          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Gender type"
            name="race_type_id"
            options={[
              {
                label: "TS",
                value: 1
              }
            ]}
            placeholder=""
          />

          <SelectField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Nationality"
            name="nationality"
            options={[
              {
                label: "Russian",
                value: 1
              }
            ]}
            placeholder=""
          />

          <TextAreaField
            className="w-full px-2"
            rows="5"
            label="About your self"
            name="description"
          />
        </div>
      </div>

      <div className="text-4xl font-extrabold my-5">Contacts</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          <TextField
            className="w-1/2 md:w-1/6 px-2"
            inputClassName="w-1/2 md:w-1/6"
            label="Index"
            name="index"
          />

          <TextField
            className="w-1/2 md:w-2/6 px-2"
            inputClassName="w-1/2 md:w-2/6"
            label="City"
            name="city"
          />

          <TextField
            className="w-full md:w-3/6 px-2"
            inputClassName="w-full md:w-3/6"
            label="Address"
            name="address"
          />
        </div>

        <div className="flex flex-wrap -mx-4">
          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Phone (example + 4179 251-15-22)"
            name="phone"
            placeholder="+41 79"
          />

          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Mail"
            name="email"
          />

          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Webpage"
            name="website"
          />
        </div>
      </div>

      <div className="flex items-end my-5">
        <div className="text-4xl font-extrabold leading-none">
          Personal info
        </div>
        <div className="ml-6">Optional</div>
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
