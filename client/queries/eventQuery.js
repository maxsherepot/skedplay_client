import gql from "graphql-tag";

export const ALL_EVENTS = gql`
  query allEvents($first: Int!, $page: Int!) {
    events(first: $first, page: $page) {
      data {
        id
        title
        favorited {
          id
        }
        club {
          address
          services {
            id
            name
            pivot {
              price
            }
          }
        }
        type {
          id
          name
        }
        photos {
          url
        }
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`;

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      favorited {
        id
      }
      club {
        address
        services {
          id
          name
          pivot {
            price
          }
        }
      }
      type {
        id
        name
      }
      photos {
        id
        url
        thumb_url
      }
    }
  }
`;

export const CREATE_CLUB_EVENT = gql `
  mutation createClubEvent($club: ID!, $input: EventInput) {
    createClubEvent(club: $club, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_EVENT = gql `
  mutation deleteEvent($event: ID!) {
    deleteEvent(event: $event) {
      status
      message
    }
  }
`;