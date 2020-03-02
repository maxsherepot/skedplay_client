import React, { useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Lightbox from 'react-datatrans-light-box'
import { PlanCard, Loader } from "UI";
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

let config = {
  merchantId: '1100004624',
  refno: 'YOUR_REFERENCE_NUMBER',
  currency: 'CHF',
  sign: '30916165706580013',
  production: false,
  paymentmethod: ['ECA', 'VIS', 'PFC', 'AMX', 'TWI'],
  themeConfiguration: {
    brandColor: '#FF3366'
  }
};

function PlansBox({ user }) {
  const [showLightbox, setShowLightbox] = useState(false);

  const onCompleted = ({ subscribeOnPlan: { invoice_id } }) => {
    // redirect to invoice pages
    // return redirect({}, `/invoices/${invoice_id}`);
  };

  const [subscribe] = useMutation(SUBSCRIBE_ON_PLAN, {
    onCompleted
  });
  const { loading, error, data: { plans } = {} } = useQuery(GET_PLANS);

  if (loading) return <Loader/>;
  if (error) return <div>{error.message}</div>;

  const onSubscribe = (planId, price) => {
    console.log(planId, price);

    config = {
      ...config,
      amount: price,
    };

    if (parseFloat(price) > 0) {
      setShowLightbox(true);
    } else {
      redirect({}, '/')
    }

    // subscribe({
    //   variables: {
    //     plan: planId,
    //     user: user.id
    //   }
    // });
  };

  const onCancelled = () => setShowLightbox(false);

  return (
    <div className="relative plans">
      {showLightbox
          ? <Lightbox
              {...config}
              // onLoaded={this.onLoaded}
              // onOpened={this.onOpened}
              onCancelled={onCancelled}
              // onError={this.onError}
          />
          : null
      }

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
