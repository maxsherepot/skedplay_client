import gql from "graphql-tag";

export const FAVORITE = gql`
  mutation favorite($model_id: ID!, $model_type: String!) {
    favorite(model_id: $model_id, model_type: $model_type)
  }
`;

export const UNFAVORITE = gql`
  mutation unfavorite($model_id: ID!, $model_type: String!) {
    unfavorite(model_id: $model_id, model_type: $model_type)
  }
`;
