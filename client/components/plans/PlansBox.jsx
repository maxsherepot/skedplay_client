import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { PlanCard } from "UI";
import redirect from "lib/redirect";
import { SUBSCRIBE_ON_PLAN } from "queries";

const GET_PLANS = gql`
  {
    plans {
      id
      name
      price
      permissions {
        name
        display_name
        pivot {
          value
        }
      }
    }
  }
`;

function PlansBox({ user }) {
  const onCompleted = ({ subscribeOnPlan: { invoice_id } }) => {
    // redirect to invoice pages

    return redirect({}, `/invoices/${invoice_id}`);
  };

  const [subscribe] = useMutation(SUBSCRIBE_ON_PLAN, {
    onCompleted
  });
  const { loading, error, data: { plans } = {} } = useQuery(GET_PLANS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const onSubscribe = planId => {
    subscribe({
      variables: {
        plan: planId,
        user: user.id
      }
    });
  };

  return (
    <div className="plans">
      {plans &&
        plans.map(plan => (
          <PlanCard plan={plan} key={plan.id} onSubscribe={onSubscribe} />
        ))}
    </div>
  );
}

PlansBox.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

export default PlansBox;
