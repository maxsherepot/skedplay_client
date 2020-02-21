import gql from "graphql-tag";

export const CONTACT_PHONES = gql `
  query contactPhones {
    contactPhones {
      id
      phone
    }
  }
`;