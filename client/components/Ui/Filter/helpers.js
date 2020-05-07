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
  }
};