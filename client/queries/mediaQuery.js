import gql from "graphql-tag";

export const DELETE_MEDIA = gql `
  mutation deleteMedia($id: ID!) {
    deleteMedia(id: $id)
  }
`;

export const DELETE_MEDIA_MASS = gql `
  mutation deleteMediaMass($ids: [ID!]!) {
    deleteMediaMass(ids: $ids)
  }
`;

export const CLEAR_MEDIA_COLLECTION = gql `
  mutation clearMediaCollection($collection_name: String!, $model_type: String!, $model_id: ID!) {
    clearMediaCollection(collection_name: $collection_name, model_type: $model_type, model_id: $model_id)
  }
`;
