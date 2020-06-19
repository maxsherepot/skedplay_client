import gql from "graphql-tag";

export const DO_EVENT = gql`
  mutation doEvent($model_id: ID!, $model_type: String!, $event: String!) {
      doEvent(model_id: $model_id, model_type: $model_type, event: $event)
  }
`;
