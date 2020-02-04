import EmployeesSearch from "components/EmployeesSearch";
import {useQuery} from "@apollo/react-hooks";
import {GET_FILTERS_STATE, GIRLS_FILTER_OPTIONS} from "queries";
import {useTranslation} from "react-i18next";
import {Loader} from 'UI';

const GirlsSearch = () => {
    const {t, i18n} = useTranslation();

    const ENTITY_NAME = "couple";

    const {loading, data: {services, employee_race_types} = {}} = useQuery(
        GIRLS_FILTER_OPTIONS
    );

    const {loading: filtersLoading, data: {filters} = {}, error} = useQuery(GET_FILTERS_STATE);

    if (loading || filtersLoading) {
        return <Loader/>;
    }

    if (error || !filters) {
        console.log(error);

        return 'error';
    }


    const fields = [
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
                return {label: s.name, value: s.id};
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
                return {label: s.name, value: s.id};
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

    return (
        <>
            <EmployeesSearch entityName={ENTITY_NAME} fields={fields} filters={filters}/>
        </>
    );
};

export default GirlsSearch;
