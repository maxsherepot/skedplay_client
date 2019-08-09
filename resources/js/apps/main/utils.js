import _ from 'lodash';

/** https://github.com/dostu/react-apollo-realworld-example-app/blob/master/src/apolloHelpers.js */
const transformGraphQLErrors = userErrors =>
  _.chain(userErrors)
    .map('message')
    .toPlainObject()
    .value();

export default transformGraphQLErrors;
