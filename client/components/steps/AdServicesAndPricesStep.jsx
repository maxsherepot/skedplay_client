import React from "react";
import * as Yup from "yup";
import { TextField, CheckboxField } from "UI";
import { GET_PRICE_TYPES, GET_SERVICES } from "queries";
import { useQuery } from "@apollo/react-hooks";


const AdServicesAndPricesStep = () => {
  const { data: { price_types } = {}, loading } = useQuery(GET_PRICE_TYPES)
  const { data: { services } = {} } = useQuery(GET_SERVICES)

  if (loading) {
    return "Loading.."
  }

  return (
    <>
      <div className="text-4xl font-extrabold mb-5">Price</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          {price_types.map(({ id, display_name }) => (
            <TextField
              key={id}
              className="flex-1 hd:w-1/12 px-2"
              inputClassName="w-1/12"
              label={display_name}
              name={`prices.${id}`}
              after={<span>$</span>}
            />
          ))}
        </div>
      </div>

      <div className="text-4xl font-extrabold my-5">Services</div>

      <div className="px-16">
        <div className="flex flex-wrap -mx-32">
          {services.map(({ id, name }) => (
            <div className="flex items-center justify-between w-1/2 px-16 mb-2" key={id}>
              <CheckboxField
                label={name}
                name={`services.${id}.active`} />

              <div className="-mb-4">
                <TextField
                  className="w-32 hd:w-64"
                  inputClassName="w-32 hd:w-64"
                  key={id}
                  label=""
                  name={`services.${id}.price`}
                  after={<span>$</span>}
                  before={<span>+</span>}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

AdServicesAndPricesStep.validationSchema = Yup.object().shape({
  // phone: Yup.string().required(),
  // recaptcha: Yup.string().required()
});

export default AdServicesAndPricesStep;
