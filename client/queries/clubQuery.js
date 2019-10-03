import gql from "graphql-tag";

export const ALL_CLUBS = gql`
  query allClubs($first: Int!, $page: Int!) {
    clubs(first: $first, page: $page) {
      data {
        id
        name
        address
        phones
        favorited {
          id
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

export const GET_CLUB = gql`
  query getClub($id: ID!) {
    club(id: $id) {
      id
      name
      address
      phones
      favorited {
        id
      }
      type {
        id
        name
      }
      description
      photos {
        url
        thumb_url
      }
      services {
        id
        name
        pivot {
          price
        }
      }
      prices {
        id
        name
        pivot {
          price
        }
      }
      events {
        id
        title
        favorited {
          id
        }
        club {
          address
        }
        type {
          id
          name
        }
        photos {
          url
        }
      }
      employees {
        id
        name
        age
        address
        isVip
        isNew
        favorited {
          id
        }
        photos {
          url
          thumb_url
        }
      }
    }
  }
`;

export const GET_CLUB_SCHEDULE = gql`
  query club_schedule($club_id: ID!) {
    schedule_period {
      day
      date
    }
    club_schedule(club_id: $club_id) {
      id
      day
      day_name
      start
      end
      available
    }
  }
`;
