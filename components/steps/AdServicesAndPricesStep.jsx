import React from "react";
import { TextField, CheckboxField, Loader } from "UI";
import { GET_PRICE_TYPES, GET_SERVICES } from "queries";
import { useQuery } from "@apollo/react-hooks";
import {useTranslation} from "react-i18next";
import {GET_GROUP_SERVICES} from "queries/serviceQuery";
import translation from "services/translation";

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

  if (priceLoading || serviceLoading || groupServicesLoading) {
    return <Loader/>;
  }

  const renderGroupService = (groupService, isHorizontal) => {
      if (!groupService) return null;

      const currentGroupServices = services.filter(s => s.group && s.group.id === groupService.id);

      if (!currentGroupServices.length) {
        return null;
      }

      return (
          <div className={isHorizontal ? "w-full" : "w-full sm:w-1/2"}>
              <div className="row text-center text-xl sm:text-2xl">
                  <h2>{translation.getLangField(groupService.name, i18n.language)}</h2>
              </div>
              <div className={isHorizontal ? "flex flex-wrap scale lg:-mt-32 lg:-mb-32" : ""}>
                  {currentGroupServices.map((service) => (
                    <div
                      className={isHorizontal ? "flex flex-row items-center justify-between w-full sm:w-auto sm:mr-6 sm:mb-8" : "flex flex-row items-center justify-between w-full px-16 sm:px-8 lg:px-0 mb-6 sm:mb-2 scale"}
                      key={service.id}
                    >
                      <CheckboxField label={translation.getLangField(JSON.parse(service.name), i18n.language)} name={`services.${service.id}.active`} />

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
                  ))}
              </div>
          </div>
      )
  }

  return (
    <>
      <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-5 scale">{t('steps.price')}</div>

      <div className="px-2 scale">
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

      <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-5 scale mt-5">{t('common.services')}</div>

      {groupServices.map((group, i) => {
        if (i === 0) {
          return (
            <div key={group.id} className="mb-12">
              {renderGroupService(group, true)}
            </div>
          );
        }

        return (
          <div key={group.id} className="px-16">
            <div className="flex flex-wrap -mx-32 lg:-ml-8">
              {renderGroupService(group)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AdServicesAndPricesStep;
