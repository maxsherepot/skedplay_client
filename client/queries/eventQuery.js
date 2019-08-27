import gql from "graphql-tag";

export const ALL_EVENTS = gql`
  query allEvents($first: Int!) {
    events(first: $first) {
      id
      title
    }
  }
`;
