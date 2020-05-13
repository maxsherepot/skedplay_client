import gql from "graphql-tag";

export const GET_PAGES = gql `
  query pages {
    pages {
      id
      key
      title
      header
      description
      keywords
    }
  }
`;

export const GET_PAGE = gql `
    query page($key: String!) {
        page(key: $key) {
            id
            key
            title
            header
            description
            keywords
        }
    }
`;