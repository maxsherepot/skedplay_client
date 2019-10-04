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
            is_client
            is_club_owner
            is_employee
            favorites_count
            clubs {
              id
              name
              phones
              admin {
                name
              }
              employees {
                id
              }
              events {
                id
              }
              type {
                id
                name
              }
            }
            employee {
              id
              reviews {
                id
              }
            }
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
