import React from "react";
import * as Yup from "yup";
import { TextField } from "UI";
import { GET_PRICE_TYPES } from "queries";
import { useQuery } from "@apollo/react-hooks";

const AdServicesAndPricesStep = () => {
  const { data: { price_types } = {}, loading } = useQuery(GET_PRICE_TYPES)  

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
              className="w-1/12 px-2"
              inputClassName="w-1/12"
              label={display_name}
              name={`prices.${id}`}
              after={<span>$</span>}
            />
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
