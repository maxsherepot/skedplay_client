import React from "react";
import { TextField, CheckboxField, Loader } from "UI";
import { GET_PRICE_TYPES, GET_SERVICES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import {GET_GROUP_SERVICES} from "queries/serviceQuery";

const AdServicesAndPricesStep = () => {
  const { data: { price_types } = {}, loading: priceLoading } = useQuery(
    GET_PRICE_TYPES
  );
  const { data: { services } = {}, loading: serviceLoading } = useQuery(
    GET_SERVICES
  );
  const {data: {groupServices: groupServices} = {}, groupServicesLoading} = useQuery(
      GET_GROUP_SERVICES
  );

  const {t, i18n} = useTranslation();

  if (priceLoading || serviceLoading) {
    return <Loader/>;
  }

  return (
    <>
      <div className="text-4xl font-extrabold mb-5">{t('steps.price')}</div>

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

      <div className="text-4xl font-extrabold my-5">{t('common.services')}</div>

        <div className="px-16">
            <div className="flex flex-wrap -mx-32">
                {groupServices && groupServices.map((groupService) => (
                    <div className="w-1/2">
                        <div className="row text-center text-2xl">
                            <h2>{groupService.name}</h2>
                        </div>
                        {services.map((service) => ( service.group && service.group.id === groupService.id && (
                            <div
                                className="flex flex-row md:items-center justify-between w-full px-16 mb-6 sm:mb-2"
                                key={service.id}
                            >
                                <CheckboxField label={service.name} name={`services.${service.id}.active`} />

                                <div className="-mb-4">
                                    <TextField
                                        className="w-32 mt-4 sm:mt-0"
                                        inputClassName="w-32"
                                        key={service.id}
                                        label=""
                                        name={`services.${service.id}.price`}
                                        after={<span>$</span>}
                                        before={<span>+</span>}
                                    />
                                </div>
                            </div>
                        )))}
                    </div>
                ))}
            </div>
        </div>
    </>
  );
};

export default AdServicesAndPricesStep;
