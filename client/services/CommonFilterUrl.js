import slug from "slug";

export default class CommonFilterUrl {
  input = {};
  cantons = [];
  cities = [];

  cantonModel = null;
  cityModel = null;

  constructor(input, models) {
    this.input = input;
    this.cantons = models.cantons || [];
    this.cities = models.cities || [];

    this.findModels();
  }

  findModels() {
    this.cantonModel = this.cantons.find(c => slug(c.name) === slug(this.input.canton || ''));

    if (!this.cantonModel) {
      return;
    }

    this.cityModel = this.cities.find(c => {
      return parseInt(c.canton_id) === parseInt(this.cantonModel.id)
        && slug(c.name) === slug(this.input.city || '');
    });
  }

  pageNotFound() {
    return (this.input.canton && !this.cantonModel) || (this.input.city && !this.cityModel);
  }

  setFilters(filters) {
    if (!this.cantonModel) {
      return filters;
    }

    filters.canton_id = this.cantonModel.id;

    if (!this.cityModel) {
      return filters;
    }

    filters.city_id = this.cityModel.id;

    return filters;
  }

  getUrlParams(filters) {
    const canton = filters.canton_id
      ? this.cantons.find(c => parseInt(c.id) === parseInt(filters.canton_id))
      : null;

    const city = filters.city_id
      ? this.cities.find(c => parseInt(c.id) === parseInt(filters.city_id))
      : null;

    let query = {};
    let asQuery = {};

    let as = "";
    let url = "";

    if (canton) {
      query.canton = slug(canton.name);
      as += `/${slug(canton.name)}`;
      url += `/canton`;

      if (city) {
        query.city = slug(city.name);
        as += `/${slug(city.name)}`;
        url += `/city`;
      }
    }

    return {query, asQuery, as, url};
  }
};