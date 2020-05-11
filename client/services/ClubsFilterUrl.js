import slug from "slug";
const queryString = require('query-string');
import CommonFilterUrl from "./CommonFilterUrl";

export default class ClubsFilterUrl {
  commonFilterUrl;
  input = {};
  types = [];
  typeModels = [];
  urlPrefix = 'clubs';
  typeKey = 'club_type_ids';

  constructor(input, models) {
    this.input = input;

    if (typeof this.input.types === 'string') {
      this.input.types = [this.input.types];
    }

    this.types = models.types || [];

    this.commonFilterUrl = new CommonFilterUrl(input, models);

    this.findModels();
  }

  findModels() {
    this.typeModels = (this.input.types || []).map(t => this.types.find(tm => slug(tm.name) === slug(t)));
  }

  pageNotFound() {
    return this.commonFilterUrl.pageNotFound()
      || (
        this.input.types && (!Array.isArray(this.input.types)
        || this.input.types.length !== this.typeModels.length)
      )
  }

  setFilters(filters) {
    filters = this.commonFilterUrl.setFilters(filters);

    if (this.typeModels && this.typeModels.length) {
      filters[this.typeKey] = this.typeModels.map(s => s.id);
    }

    return filters;
  }

  getUrlParams(filters, canonical = false) {
    let {query, asQuery, as, url} = this.commonFilterUrl.getUrlParams(filters);

    let needCanonical = false;

    as = `/${this.urlPrefix}${as}`;
    url = `/${this.urlPrefix}${url}`;

    if (filters[this.typeKey] && filters[this.typeKey].length) {
      let typeModels = filters[this.typeKey].map(t => this.types.find(ct => parseInt(ct.id) === parseInt(t)));
      query.types = typeModels.map(s => slug(s.name)).sort();
      asQuery.types = query.types;

      if (canonical) {
        query.types = query.types[0];
        asQuery.types = asQuery.types[0];
        needCanonical = filters[this.typeKey].length > 1;
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
};