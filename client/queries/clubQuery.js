import gql from "graphql-tag";

export const ALL_CLUBS = gql`
  query allClubs($first: Int!, $page: Int!) {
    clubs(first: $first, page: $page) {
      data {
        id
        name
        address
        phones
        lat
        lng
        favorited {
          id
        }
        type {
          id
          name
        }
        logo {
          url
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
      index
      city_id
      address
      lat
      lng
      email
      website
      phones
      favorited {
        id
      }
      type {
        id
        name
      }
      description
      logo {
        url
      }
      photos {
        id
        url
        thumb_url
      }
      videos {
        id
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
          id
          address
        }
        type {
          id
          name
          display_name
        }
        photos {
          url
        }
      }
      schedule {
          id
          day
          day_name
          start
          end
          order
          available
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
        owner {
          ... on Club {
            id
            name
          }
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

export const CREATE_CLUB = gql`
  mutation createClub($input: ClubInput!) {
    createClub(input: $input) {
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
      logo {
        url
        thumb_url
      }
      photos {
        url
        thumb_url
      }
      owner {
        id
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

export const UPDATE_CLUB = gql`
  mutation updateClub($club: ID!, $input: ClubInput!) {
    updateClub(club: $club, input: $input) {
        message
        status
    }
  }
`;

export const SYNC_CLUB_PRICES = gql `
  mutation syncClubPrices($club: ID!, $prices: JSON) {
    syncClubPrices(club: $club, prices: $prices) {
      status
      message
    }
  }
`;

export const SYNC_CLUB_SERVICES = gql `
  mutation syncClubServices($club: ID!, $services: JSON) {
    syncClubServices(club: $club, services: $services) {
      status
      message
    }
  }
`;

export const UPLOAD_CLUB_FILES = gql `
  mutation uploadClubFiles(
    $club: ID!
    $collection: String!
    $files: [Upload]!
  ) {
  uploadClubFiles(
      club: $club
      collection: $collection
      files: $files
    ) {
      status
      message
    }
  }
`;

export const CREATE_CLUB_SCHEDULE = gql `
  mutation createClubSchedule(
    $input: [ClubScheduleInput]
  ) {
    createClubSchedule(
      input: $input
    ) {
      status
      message
    }
  }
`;

export const UPDATE_CLUB_SCHEDULE = gql `
  mutation updateClubSchedule(
    $input: [ClubScheduleInput]
  ) {
    updateClubSchedule(
      input: $input
    ) {
      status
      message
    }
  }
`;