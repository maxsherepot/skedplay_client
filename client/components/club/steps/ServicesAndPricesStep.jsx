import React from "react";
import * as Yup from "yup";
import { TextField, CheckboxField, Loader } from "UI";
import { GET_PRICE_TYPES, GET_SERVICES } from "queries";
import { useQuery } from "@apollo/react-hooks";

const ServicesAndPricesStep = () => {
  const { data: { price_types } = {}, loading: priceLoading } = useQuery(
    GET_PRICE_TYPES
  );
  const { data: { services } = {}, loading: serviceLoading } = useQuery(
    GET_SERVICES
  );

  if (priceLoading || serviceLoading) {
    return <Loader/>;
  }

  return (
    <>
      <div className="text-4xl font-extrabold mb-5">Price</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          {price_types.map(({ id, display_name }) => (
            <TextField
              key={id}
              className="w-full md:flex-1 hd:w-1/12 px-2"
              inputClassName="w-1/12"
              label={display_name}
              name={`prices.${id}`}
              after={<span>$</span>}
            />
          ))}
        </div>
      </div>

      <div className="text-4xl font-extrabold my-5">Services</div>

      <div className="px-4">
        <div className="flex flex-wrap -mx-8">
          {services.map(({ id, name }) => (
            <div
              className="flex flex-col sm:flex-row md:items-center justify-between w-full md:w-1/2 px-4 mb-6 sm:mb-2"
              key={id}
            >
              <CheckboxField label={name} name={`services.${id}.active`} />

              <div className="-mb-4">
                <TextField
                  className="w-32 mt-4 sm:mt-0"
                  inputClassName="w-32"
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

ServicesAndPricesStep.validationSchema = Yup.object().shape({});

export default ServicesAndPricesStep;
