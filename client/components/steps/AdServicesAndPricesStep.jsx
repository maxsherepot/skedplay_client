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

  const renderGroupService = (groupService, isHorizontal) => {
      if (!groupService) return null
      return (
          <div className={isHorizontal ? "w-full" : "w-full sm:w-1/2"}>
              <div className="row text-center text-xl sm:text-2xl">
                  <h2>{groupService.name}</h2>
              </div>
              <div className={isHorizontal ? "flex flex-wrap" : ""}>
                  {services.map((service) => (service.group && service.group.id === groupService.id && (
                      <div
                          className={isHorizontal ? "flex flex-row items-center justify-between w-full sm:w-auto sm:mr-6 sm:mb-8" : "flex flex-row items-center justify-between w-full px-16 sm:px-8 lg:px-16 mb-6 sm:mb-2"}
                          key={service.id}
                      >
                          <CheckboxField label={service.name} name={`services.${service.id}.active`} />

                          <div className="ml-2 sm:-mb-4">
                              <TextField
                                  className="w-32 mt-4 sm:mt-0"
                                  inputClassName="w-32"
                                  key={service.id}
                                  label=""
                                  max="9999"
                                  name={`services.${service.id}.price`}
                                  after={<span className="adornment">CHF</span>}
                                  before={<span className="adornment">+</span>}
                              />
                          </div>
                      </div>
                  )))}
              </div>
          </div>
      )
  }

  const groupService1 = groupServices.length > 0 && groupServices[0]
  const groupService2 = groupServices.length > 1 && groupServices[1]
  const groupService3 = groupServices.length > 2 && groupServices[2]
  const groupService4 = groupServices.length > 3 && groupServices[3]

  return (
    <>
      <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-5">{t('steps.price')}</div>

      <div className="px-2">
        <div className="flex flex-wrap -mx-4">
          {price_types.map(({ id, display_name }) => (
            <TextField
              key={id}
              className="sm:w-3/12 md:w-3/12 lg:w-1/8 w-1/2 hd:w-1/6 px-2"
              inputClassName="w-1/12"
              label={display_name}
              max="9999"
              name={`prices.${id}`}
              after={<span className="adornment">CHF</span>}
            />
          ))}
        </div>
      </div>

      <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-5 mt-5">{t('common.services')}</div>

          <div className="mb-12">
              {renderGroupService(groupService2, true)}
          </div>
        <div className="px-16">
            <div className="flex flex-wrap -mx-32">
                {renderGroupService(groupService1)}
                {renderGroupService(groupService3)}
                {renderGroupService(groupService4)}
            </div>
        </div>
    </>
  );
};

export default AdServicesAndPricesStep;
