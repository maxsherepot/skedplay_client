import React from "react";
import PropTypes from "prop-types";
import { PlusSvg } from "icons";
import {useTranslation} from "react-i18next";

const PriceAndService = ({ title, prices, services }) => {
    const {t, i18n} = useTranslation();

    return (
        <>
            <div className="text-2xl font-bold my-5">
                {title}
            </div>
            <div className="flex flex-col sm:flex-row bg-white text-sm hd:text-base rounded-lg p-4 lg:p-12">
                <div className="w-full sm:w-1/3 px-2 sm:px-0">
                    {
                        prices.length === 0 &&
                            <div className="w-full h-full flex items-center justify-center">
                                No Prices yet
                            </div>
                    }
                    {prices.map((price) => (
                        <section className="mb-3" key={price.id}>
                            <div className="text-grey">{price.display_name}</div>
                            <div className="line" />
                            <div className="w-12">${price.pivot.price}</div>
                        </section>
                    ))}
                </div>
                <div className="w-full sm:w-2/3 sm:px-2 hd:px-6 py-1">
                    <div className="flex flex-wrap -mx-2">
                        {services.map(service => (
                            <div key={service.id} className="px-2">
                                <div className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                                    {service.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-2 my-2">{t('clubs.extra_service')}</div>
                    <div className="flex flex-wrap -mx-2">
                        <div className="px-2">
                            <div className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                                {t('clubs.anal')} <span className="text-red ml-1">+$100</span>
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="bg-white border border-divider rounded-full px-3 py-1 text-xs mb-4">
                                {t('clubs.erotic_massage')} <span className="text-red ml-1">+$100</span>
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="bg-white border border-divider rounded-full px-2 py-2 text-xs mb-4">
                                <PlusSvg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PriceAndService.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PriceAndService;
