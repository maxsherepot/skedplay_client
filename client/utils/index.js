import _ from "lodash";

/** https://github.com/jaredpalmer/formik/issues/33#issuecomment-519081116 */
/** https://github.com/dostu/react-apollo-realworld-example-app/blob/master/src/apolloHelpers.js */

const transformValidationErrors = errors => {
  return errors;
};

const getErrors = e => {
  if (e && e.graphQLErrors.length) {
    const [error] = e.graphQLErrors;

    switch (error.extensions.category) {
      case "validation":
        return transformValidationErrors(
          error.extensions[error.extensions.category]
        );
      case "authentication":
        return error.message;

      default:
        break;
    }
  }

  return null;
};

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options
  };

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export { transformValidationErrors, getErrors, setCookie };
