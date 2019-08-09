import _ from 'lodash';

/** https://github.com/jaredpalmer/formik/issues/33#issuecomment-519081116 */
/** https://github.com/dostu/react-apollo-realworld-example-app/blob/master/src/apolloHelpers.js */

const transformGraphQLErrors = userErrors =>
  _.chain(userErrors)
    .map('extensions')
    .map('validation')
    .toPlainObject()
    .value();

export default transformGraphQLErrors;
