import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query {
          me {
            id
            name
            phone
            email
          }
        }
      `
    })
    .then(({ data: { me } }) => {
      return { loggedInUser: me };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
