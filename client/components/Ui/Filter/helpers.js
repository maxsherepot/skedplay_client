export default {
  filterFilters(filters) {
    const filteredFilters = {};

    Object.keys(filters).map(key => {
      if (filters[key] === "")  {
        if (['canton_id', 'city_id'].indexOf(key) === -1) {
          return;
        }
      }

      if (filters[key] === null) {
        return (filters[key] = "");
      }

      let filter = filters[key];

      if (key === 'age') {
        delete filter.__typename;
      }

      if (key === 'orderBy') {
        delete filter[0].__typename;
      }

      if (key === 'show_level') {
        // 1 - active, 2 - soon
        // filter = filter ? 2 : 1;
        filter = !!filter;
      }

      // if (key === 'close_to' && filter) {
      //   filter = {
      //     distanceKm: filter,
      //     lat: coords.latitude,
      //     lng: coords.longitude,
      //   };
      // }

      filteredFilters[key] = filter;
    });

    // if (!filteredFilters.show_level) {
    //   filteredFilters.show_level = 1;
    // }

    return filteredFilters;
  },
  getLocationFilters(cantons, cities, t) {
    const cantonFilter = {
      component: "select",
      name: "canton_id",
      label: t('common.canton'),
      placeholder: t('common.all_switzerland'),
      options: [
        {value: '', label: t('common.all_switzerland')},
        ...cantons.map(c => ({value: c.id, label: c.name})),
      ],
      handleChange(value, setFieldValue) {
        if (process.env.CITY_FILTER !== 'true') {
          return;
        }
        setFieldValue('city_id', '');
      },
    };

    if (process.env.CITY_FILTER !== 'true') {
      return [cantonFilter];
    }

    const cityFilter = {
      component: "select",
      name: "city_id",
      label: t('clubs.city'),
      placeholder: t('common.all_switzerland'),
      options: [
        {value: '', label: t('common.all_switzerland')},
        ...cities.map(c => ({value: c.id, label: c.name, canton_id: c.canton_id})),
      ],
      handleChange(value, setFieldValue) {
        const city = cities.find(c => parseInt(c.id) === parseInt(value));

        if (!city) {
          return;
        }

        setFieldValue('canton_id', city.canton_id);
      },
      handlePlaceholder(values) {
        const cantonId = values.canton_id;

        if (!cantonId) {
          return t('common.all_switzerland');
        }

        const canton = cantons.find(c => parseInt(c.id) === parseInt(values.canton_id));

        if (!canton) {
          return t('common.all_switzerland');
        }

        return t('common.all') + ' ' + canton.name;
      },
      filterOptions(options, values) {
        const cantonId = values.canton_id;

        if (!cantonId) {
          return options;
        }

        return options.filter(o => parseInt(o.canton_id) === parseInt(cantonId));
      },
    };

    return [cantonFilter, cityFilter];
  },
  getDistanceFilter(t) {
    return {
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
        if (!value) {
          return null;
        }

        if (!parseInt(value)) {
          value = value.distanceKm;
        }

        if (!value) {
          return null;
        }

        return t('common.perimeter') + ' ' + value + 'km';
      }
    };
  },
  getGirlsFilters(cantons, cities, services, employee_race_types, t) {
    return [
      ...this.getLocationFilters(cantons, cities, t),
      {
        component: "multi-select",
        name: "services",
        label: t('common.services'),
        placeholder: t('common.select_services'),
        showCheckboxes: true,
        className: "w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/7 hd:w-1/8 px-2 services-select__div",
        options: services.map(s => {
          return { label: s.name, value: s.id };
        })
      },
      /*{
        component: "multi-select",
        showCheckboxes: true,
        name: "genders",
        label: t('common.gender'),
        placeholder: t('common.all_gender'),
        options: [
          {
            label: t('common.female'),
            value: 2
          },
          {
            label: t('common.male'),
            value: 1
          }
        ]
      },*/
      {
        component: "multi-select",
        showCheckboxes: true,
        name: "race_type_ids",
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
        to: 60,
        labelResolver({from, to}) {
          if (parseInt(from) === 18 && parseInt(to) === 60) {
            return null;
          }

          return t('common.age_from_to', {from: from, to: to});
        }
      },
      this.getDistanceFilter(t),
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
  },
  getClubsFilters(cantons, cities, club_types, isGeolocationEnabled, t) {
    let fields =  [
      ...this.getLocationFilters(cantons, cities, t),
      {
        component: "multi-select",
        showCheckboxes: true,
        name: "club_type_ids",
        label: t('clubs.event_type'),
        placeholder: t('clubs.select_event_type'),
        options: club_types.map(s => {
          return {label: s.name, value: s.id};
        })
      },
    ];

    if (isGeolocationEnabled) {
      fields.push(this.getDistanceFilter(t));
    }

    return fields;
  },
  getEventsFilters(cantons, cities, event_types, isGeolocationEnabled, t) {
    let fields =  [
      ...this.getLocationFilters(cantons, cities, t),
      {
        component: "multi-select",
        showCheckboxes: true,
        name: "event_type_ids",
        label: t('events.event_type'),
        placeholder: t('events.select_event_type'),
        options: event_types.map(s => {
          return { label: s.name, value: s.id };
        })
      },
      // {
      //   component: "select",
      //   name: "date",
      //   label: t('common.date'),
      //   placeholder: t('common.select_date'),
      //   options: []
      // }
    ];

    if (isGeolocationEnabled) {
      fields.push(this.getDistanceFilter(t));
    }

    return fields;
  }
};