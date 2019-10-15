import gql from "graphql-tag";

export const DELETE_MEDIA = gql `
  mutation deleteMedia($id: ID!) {
    deleteMedia(id: $id)
  }
`;
