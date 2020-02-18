import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {Filter, Loader} from "UI";
import {GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS, CANTONS, ALL_CLUBS} from "queries";
import {useTranslation} from "react-i18next";
import { geolocated } from "react-geolocated";
import EntitySearch from "components/EntitySearch";
import ClubsBox from "components/ClubsBox";

const ENTITY_NAME = "clubs";

function Clubs({loggedInUser, isGeolocationEnabled}) {
    const {t, i18n} = useTranslation();

    const {loading, data: {club_types} = {}} = useQuery(
        EVENTS_FILTER_OPTIONS
    );

    const {data: {filters} = {}, loading: filtersLoading, error: filterError} = useQuery(GET_FILTERS_STATE);

    const { loading: cantonsLoading, data: { cantons } = {} } = useQuery(
      CANTONS
    );

    if (loading || cantonsLoading || filtersLoading) {
        return <Loader/>;
    }

    const fields = [
        {
            component: "multi-select",
            name: "cantons",
            label: t('common.location'),
            showCheckboxes: true,
            placeholder: t('common.all_switzerland'),
            options: [
                ...cantons.map(c => ({value: c.id, label: c.name})),
            ],
        },
        {
            component: "select",
            name: "club_type_id",
            label: t('clubs.event_type'),
            placeholder: t('clubs.select_event_type'),
            options: club_types.map(s => {
                return {label: s.name, value: s.id};
            })
        },
    ];

    if (isGeolocationEnabled) {
        fields.splice(0, 1);
        fields.push({
            component: "distance-slider",
            name: "close_to",
            label: t('common.perimeter'),
            initValue: 0,
            valueResolver(value) {
                if (!parseInt(value)) {
                    return t('common.off');
                }

                return value + 'km';
            },
            labelResolver(value) {
                if (!parseInt(value)) {
                    value = value.distanceKm;
                }

                if (!value) {
                    return null;
                }

                return t('common.perimeter') + ' ' + value + 'km';
            }
        });
    }

    return (
      <>
          <EntitySearch
            entityName={ENTITY_NAME}
            fields={fields}
            filters={filters}
            Box={ClubsBox}
            entityQuery={ALL_CLUBS}
          />
      </>
    );
}

Clubs.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        return {};
    }
    return {user};
};

Clubs.getLayout = page => page;

export default geolocated()(Clubs);
