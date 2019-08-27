import _ from "lodash";

/** https://github.com/jaredpalmer/formik/issues/33#issuecomment-519081116 */
/** https://github.com/dostu/react-apollo-realworld-example-app/blob/master/src/apolloHelpers.js */

const transformValidationErrors = userErrors => {
  return {};
};

const isAuthError = errors =>
  _.chain(errors)
    .map("extensions")
    .map("category")
    .value();

// e &&
//   e.graphQLErrors &&
//   e.graphQLErrors[0].extensions.category === "authentication";

export { transformValidationErrors, isAuthError };
