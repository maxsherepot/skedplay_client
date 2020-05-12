import gql from "graphql-tag";

export const ALL_CLUBS = gql`
  query allClubs($first: Int!, $page: Int!, $filters: ClubFilters) {
    clubs(first: $first, page: $page, filters: $filters) {
      data {
        id
        name
        address
        city {
          id
          name
          canton {
            id
            name
          }
        }
        phones
        lat
        lng
        website
        status
        user_status
        start_time
        end_time
        city {
          id
          name
        }
        employees {
          id
          name
        }
        favorited {
          id
        }
        type {
          id
          name
        }
        logo {
          id
          name
          url
          thumb_url
        }
        photos {
          url
          custom_properties
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

export const CLUBS_SEARCH = gql`
    query clubs($filters: ClubFilters) {
        clubsSearch(filters: $filters) {
            id
            name
            user_id
        }
    }
`;

export const GET_CLUB = gql`
  query getClub($id: ID!, $canton_id: Int, $city_id: Int) {
    club(id: $id, canton_id: $canton_id, city_id: $city_id) {
      id
      name
      index
      city_id
      city {
        id
        name
        canton {
          id
          name
        }
      }
      address
      lat
      lng
      email
      comment
      website
      phones
      start_time
      end_time
      favorited {
        id
      }
      type {
        id
        name
      }
      description
      logo {
        id
        name
        url
        thumb_url
      }
      photos {
        id
        url
        thumb_url
        custom_properties
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
          price
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
          id
          url
          model_type
          model_id
          collection_name
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
        type
        city {
          id
          name
          canton {
            id
            name
          }
        }
        address
        isVip
        isNew
        inGeneral
        favorited {
          id
        }
        schedule {
          id
          day
          available
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
      manager {
          id
          name
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
      start_time
      end_time
      favorited {
        id
      }
      type {
        id
        name
      }
      description
      logo {
        id
        name
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
  mutation updateClub($club: ID!, $input: ClubInput) {
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
    $custom_properties: JSON
  ) {
  uploadClubFiles(
      club: $club
      collection: $collection
      files: $files
      custom_properties: $custom_properties
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

export const ALL_CLUB_TYPES = gql`
  query allClubTypes {
    club_types {
      id
      name
    }
  }
`;