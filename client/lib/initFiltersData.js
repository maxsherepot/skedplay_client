export default {
    girls: {
        // active: 1,
        show_level: true,
        type: 1,
        canton_id: "",
        city_id: "",
        user_status: 1,
        status: 1,
        services: [],
        inGeneral: true,
        gender: "",
        race_type_id: "",
        orderBy: [
            {
                field: "fake",
                order: 'ASC',
                __typename: "orderBy5"
            },
            {
                field: "age",
                order: 'ASC',
                __typename: "orderBy"
            },
        ],
        age: {
            from: 18,
            to: 60,
            __typename: "age"
        },
        __typename: "GirlFilters"
    },
    vip_escort: {
        // active: 1,
        show_level: true,
        isVip: true,
        canton_id: "",
        city_id: "",
        services: [],
        gender: "",
        user_status: 1,
        status: 1,
        race_type_id: "",
        orderBy: [
            {
                field: "fake",
                order: 'ASC',
                __typename: "orderBy6"
            },
            {
                field: "age",
                order: 'ASC',
                __typename: "orderBy1"
            },
        ],
        age: {
            from: 18,
            to: 60,
            __typename: "age1"
        },
        __typename: "BoyFilters"
    },
    trans: {
        // active: 1,
        show_level: true,
        type: 2,
        inGeneral: true,
        canton_id: "",
        city_id: "",
        services: [],
        user_status: 1,
        status: 1,
        gender: "",
        race_type_id: "",
        orderBy: [
            {
                field: "fake",
                order: 'ASC',
                __typename: "orderBy7"
            },
            {
                field: "age",
                order: 'ASC',
                __typename: "orderBy2"
            },
        ],
        age: {
            from: 18,
            to: 60,
            __typename: "age2"
        },
        __typename: "CoupleFilters"
    },
    clubs: {
        canton_id: "",
        city_id: "",
        club_type: "",
        start_time: "",
        user_status: 1,
        status: 1,
        orderBy: [
            {
                field: "start_time",
                order: 'ASC',
                __typename: "orderBy3"
            }
        ],
        // perimeter: 10,
        __typename: "ClubFilters"
    },
    events: {
        canton_id: "",
        city_id: "",
        event_type: "",
        user_status: 1,
        status: 1,
        // perimeter: 10,
        date: "",
        __typename: "EventFilters"
    },
    __typename: "Filters"
};