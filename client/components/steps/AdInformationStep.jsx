import React from "react";
import * as Yup from "yup";
import { LangSelector } from "components/ad";
import { TextField, SelectField, TextAreaField, GroupCheckbox } from "UI";

const AdInformationStep = () => {
  const characteristics = [
    {
      label: "Hair",
      name: "hair",
      options: [
        {
          label: "Black",
          value: "black"
        },
        {
          label: "White",
          value: "white"
        }
      ]
    },
    {
      label: "Eye color",
      name: "eye_color",
      options: []
    },
    {
      label: "Growth",
      name: "growth",
      options: []
    },
    {
      label: "Weight",
      name: "weight",
      options: []
    },
    {
      label: "Breast size",
      name: "breast_size",
      options: []
    },
    {
      label: "Body",
      name: "body",
      options: [
        {
          label: "Fitness",
          value: "fitness"
        }
      ]
    }
  ];
 
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

          <GroupCheckbox
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
          />
        </div>

        <div className="flex flex-wrap -mx-4">
          <TextField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-1/3"
            label="Gender"
            name="gender"
            placeholder=""
          />

          <TextField
            className="w-full sm:w-1/2  lg:w-1/3 px-2"
            inputClassName="w-1/3"
            label="Gender type"
            name="gender_type"
          />

          <TextField
            className="w-full sm:w-1/2 lg:w-1/3 px-2"
            inputClassName="w-1/3"
            label="Nationality"
            name="nationality"
          />

          <TextAreaField
            className="w-full px-2"
            rows="5"
            label="About your self"
            name="descriptions"
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
            name="mail"
          />

          <TextField
            className="w-full md:w-1/3 px-2"
            inputClassName="w-full md:w-1/3"
            label="Webpage"
            name="webpage"
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
          {characteristics &&
            characteristics.map(({ label, name, options }, i) => (
              <SelectField
                key={i}
                className="w-full sm:w-1/3 md:w-1/6 px-2"
                inputClassName="w-full md:w-1/3"
                label={label}
                name={name}
                value=""
                options={options}
                placeholder=""
              />
            ))}
        </div>
        <LangSelector />
      </div>
    </>
  );
};

AdInformationStep.validationSchema = Yup.object().shape({
  // phone: Yup.string().required(),
  // recaptcha: Yup.string().required()
});

export default AdInformationStep;
