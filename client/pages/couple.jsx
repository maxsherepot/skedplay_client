import EmployeesSearch from "components/EmployeesSearch";
import {useQuery} from "@apollo/react-hooks";
import { GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS } from "queries";
import {useTranslation} from "react-i18next";
import { Loader } from "UI";
import { geolocated } from "react-geolocated";

const GirlsSearch = ({isGeolocationEnabled}) => {
    const ENTITY_NAME = "couple";
    const {t, i18n} = useTranslation();

    const { loading, data: { services, employee_race_types } = {} } = useQuery(
      GIRLS_FILTER_OPTIONS
    );

    const { loading: filtersLoading, data: { filters } = {}, error } = useQuery(GET_FILTERS_STATE);

    if (loading || filtersLoading) {
        return <Loader/>;
    }

    if (error || !filters) {
        console.log(error);

        return 'error';
    }

    let fields = [
        // {
        //   component: "select",
        //   name: "location",
        //   label: "Location",
        //   placeholder: "Select your location",
        //   options: [
        //     {
        //       label: "Zürich",
        //       value: "zürich"
        //     },
        //     {
        //       label: "Geneva",
        //       value: "geneva"
        //     },
        //     {
        //       label: "Basel",
        //       value: "basel"
        //     },
        //     {
        //       label: "Lausanne",
        //       value: "lausanne"
        //     },
        //     {
        //       label: "Bern",
        //       value: "bern"
        //     },
        //     {
        //       label: "Winterthur",
        //       value: "winterthur"
        //     },
        //     {
        //       label: "Lucerne",
        //       value: "lucerne"
        //     }
        //   ]
        // },
        {
            component: "multi-select",
            name: "services",
            label: t('common.services'),
            placeholder: t('common.select_services'),
            showCheckboxes: true,
            options: services.map(s => {
                return { label: s.name, value: s.id };
            })
        },
        {
            component: "select",
            name: "gender",
            label: t('common.gender'),
            placeholder: t('common.all_gender'),
            options: [
                {
                    label: t('common.all_gender'),
                    value: ''
                },
                {
                    label: t('common.female'),
                    value: 2
                },
                {
                    label: t('common.male'),
                    value: 1
                }
            ]
        },
        {
            component: "select",
            name: "race_type_id",
            label: t('common.type'),
            placeholder: t('common.select_type'),
            options: employee_race_types.map(s => {
                return { label: s.name, value: s.id };
            })
        },
        {
            component: "range",
            name: "age",
            label: t('common.age'),
            from: 18,
            to: 45,
            labelResolver({from, to}) {
                if (parseInt(from) === 18 && parseInt(to) === 45) {
                    return null;
                }

                return t('common.age_from_to', {from: from, to: to});
            }
        },
        {
            component: "slider",
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
        },
        {
            component: "checkbox",
            name: "show_level",
            label: t('common.coming_soon'),
            checked: false,
            labelResolver(value) {
                if (value) {
                    return this.label;
                }

                return null;
            }
        },
    ];

    if (!isGeolocationEnabled) {
        fields.splice(fields.length - 2, 1);
    }

    return (
      <>
          <EmployeesSearch entityName={ENTITY_NAME} fields={fields} filters={filters} />
      </>
    );
};

export default geolocated()(GirlsSearch);
