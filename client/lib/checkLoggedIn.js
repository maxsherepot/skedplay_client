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
            employees_photos
            employees_videos
            employees_events
            clubs {
              id
              name
              phones
              admin {
                name
              }
              employees {
                id
                name
              }
              events {
                id
                title
#                type {
#                  id
#                  name
#                }
                photos {
                  url
                }
              }
              type {
                id
                name
              }
              events_count
              photos_count
              videos_count
            }
            employees {
              id
              events_count
              photos_count
              videos_count
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
