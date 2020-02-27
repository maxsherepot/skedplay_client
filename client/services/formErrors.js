import dot from "dot-object";

export default {
  getErrorText(fieldName, label, touched, errors) {
    const currentTouched = dot.pick(fieldName, touched) || touched[fieldName];
    const currentError = dot.pick(fieldName, errors) || errors[fieldName];

    let error = currentTouched && currentError ? currentError : null;

    if (Array.isArray(error)) {
      error = error.join(' ');
    }

    if (error && label) {
      error = error.replace(fieldName, label);
    }

    return error;
  },
  getFieldValue(values, field) {
    return dot.pick(field, values) || values[field];
  }
};