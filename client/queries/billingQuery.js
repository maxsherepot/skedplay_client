import gql from "graphql-tag";

export const SUBSCRIBE_ON_PLAN = gql`
  mutation subscribeOnPlan($plan: ID!, $user: ID!) {
    subscribeOnPlan(plan: $plan, user: $user) {
      invoice_id
    }
  }
`;
