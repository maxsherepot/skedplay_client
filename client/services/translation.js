export default {
  getLangField(field, lang) {
    field = JSON.parse(field);

    if (!field[lang]) {
      return field.en;
    }

    return field[lang];
  },
}