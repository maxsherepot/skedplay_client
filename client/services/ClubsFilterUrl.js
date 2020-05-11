import slug from "slug";
const queryString = require('query-string');
import CommonFilterUrl from "./CommonFilterUrl";

export default class ClubsFilterUrl {
  commonFilterUrl;
  input = {};
  types = [];
  typeModels = [];
  urlPrefix = 'clubs';

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
      filters.club_type_ids = this.typeModels.map(s => s.id);
    }

    return filters;
  }

  getUrlParams(filters) {
    let {query, asQuery, as, url} = this.commonFilterUrl.getUrlParams(filters);

    as = `/${this.urlPrefix}${as}`;
    url = `/${this.urlPrefix}${url}`;

    if (filters.club_type_ids && filters.club_type_ids.length) {
      let typeModels = filters.club_type_ids.map(t => this.types.find(ct => parseInt(ct.id) === parseInt(t)));
      query.types = typeModels.map(s => slug(s.name)).sort();
      asQuery.types = query.types;
    }

    return {query, asQuery, as, url};
  }

  getRouterParams(filters) {
    const {query, asQuery, as, url} = this.getUrlParams(filters);

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
    };
  }
};