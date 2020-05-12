export default {
  getLangField(field, lang) {
    if (!field) {
      return null;
    }

    field = JSON.parse(field);

    if (!field[lang]) {
      return field.de || field.en;
    }

    return field[lang];
  },
}