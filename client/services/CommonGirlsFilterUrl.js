const queryString = require('query-string');
import CommonFilterUrl from "./CommonFilterUrl";

export default class CommonGirlsFilterUrl {
  commonFilterUrl;
  input = {};
  type;
  services = [];
  races = [];
  serviceModels = [];
  raceModels = [];

  constructor(input, models, type) {
    this.input = input;

    if (typeof this.input.services === 'string') {
      this.input.services = [this.input.services];
    }

    if (typeof this.input.races === 'string') {
      this.input.races = [this.input.races];
    }

    this.services = models.services || [];
    this.races = models.races || [];
    
    this.type = type;
    
    this.commonFilterUrl = new CommonFilterUrl(input, models);

    this.findModels();
  }

  findModels() {
    this.serviceModels = (this.input.services || []).map(s => this.services.find(sm => sm.slug === s));
    this.raceModels = (this.input.races || []).map(r => this.races.find(er => er.slug === r));

    console.log(this.serviceModels, this.services);
  }

  pageNotFound() {
    return this.commonFilterUrl.pageNotFound()
      || (this.input.age_from && (this.input.age_from < 18 || this.input.age_from > 59))
      || (this.input.age_to && (this.input.age_to < 19 || this.input.age_to > 60))
      || (
        this.input.services && (!Array.isArray(this.input.services) 
        || this.input.services.length !== this.serviceModels.length)
      )
      || (
        this.input.races && (!Array.isArray(this.input.races)
        || this.input.races.length !== this.raceModels.length)
      ) 
  }

  setFilters(filters) {
    filters = this.commonFilterUrl.setFilters(filters);

    if (this.input.age_from || this.input.age_to) {
      filters.age = {};

      if (this.input.age_from) {
        filters.age.from = parseInt(this.input.age_from);
      } else {
        filters.age.from = 18;
      }

      if (this.input.age_to) {
        filters.age.to = parseInt(this.input.age_to);
      } else {
        filters.age.to = 60;
      }
    }

    if (this.serviceModels && this.serviceModels.length) {
      filters.services = this.serviceModels.map(s => s.id);
    }

    if (this.raceModels && this.raceModels.length) {
      filters.race_type_ids = this.raceModels.map(r => r.id);
    }

    return filters;
  }

  getUrlParams(filters, canonical = false) {
    let {query, asQuery, as, url} = this.commonFilterUrl.getUrlParams(filters);
    let needCanonical = false;

    as = `/${this.type}${as}/`;
    url = `/${this.type}${url}/`;

    if (filters.age) {
      if (filters.age.from && parseInt(filters.age.from) !== 18) {
        query.age_from = filters.age.from;
        asQuery.age_from = filters.age.from;
      }

      if (filters.age.to && parseInt(filters.age.to) !== 60) {
        query.age_to = filters.age.to;
        asQuery.age_to = filters.age.to;
      }
    }

    if (filters.services && filters.services.length) {
      let servicesModels = filters.services.map(s => this.services.find(sm => parseInt(sm.id) === parseInt(s)));
      query.services = servicesModels.map(s => s.slug).sort();
      asQuery.services = query.services;

      if (canonical) {
        query.services = query.services[0];
        asQuery.services = asQuery.services[0];
        needCanonical = filters.services.length > 1;
      }
    }

    if (filters.race_type_ids && filters.race_type_ids.length) {
      let raceTypeModels = filters.race_type_ids.map(t => this.races.find(et => parseInt(et.id) === parseInt(t)));
      query.races = raceTypeModels.map(s => s.slug).sort();
      asQuery.races = query.races;

      if (canonical) {
        query.races = query.races[0];
        asQuery.races = asQuery.races[0];
        needCanonical = filters.race_type_ids.length > 1;
      }
    }

    return {query, asQuery, as, url, needCanonical};
  }

  getRouterParams(filters, canonical = false) {
    const {query, asQuery, as, url, needCanonical} = this.getUrlParams(filters, canonical);

    let filterQueryString = queryString.stringify(query);
    if (filterQueryString) {
      filterQueryString = `?${filterQueryString}`;
    }

    let asQueryString = queryString.stringify(asQuery);
    if (asQueryString) {
      asQueryString = `?${asQueryString}`;
    }

    return {
      url: url + filterQueryString,
      as: as + asQueryString,
      needCanonical
    };
  }

  getBreadcrumbs() {
    const breadcrumbs = [];

    if (this.input.canton) {
      const canton = this.commonFilterUrl.cantonModel;

      breadcrumbs.push({
        as: `/${this.type}/${this.input.canton}`,
        href: `/${this.type}/canton`,
        label: canton.name
      });

      if (this.input.city) {
        const city = this.commonFilterUrl.cityModel;

        breadcrumbs.push({
          as: `/${this.type}/${this.input.city}`,
          href: `/${this.type}/canton/city`,
          label: city.name
        });
      }
    }

    return breadcrumbs;
  }
};