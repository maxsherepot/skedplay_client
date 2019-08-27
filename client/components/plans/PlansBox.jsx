import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { PlanCard } from "UI";

// const GET_GIRLS = gql`
//   {
//     employees(first: 15) {
//       data {
//         id
//         name
//         age
//         address
//         isVip
//         isNew
//         photos {
//           id
//           thumb_url
//         }
//       }
//     }
//   }
// `;

const plans = [
  {
    id: 1,
    name: "Start",
    price: "Free",
    permissions: [
      {
        name: "Free consultation",
        value: true
      },
      {
        name: "Credit card payment",
        value: true
      },
      {
        name: "Home Payment (per Rechhung)",
        value: true
      },
      {
        name: "club in the account",
        value: 1
      },
      {
        name: "Events",
        value: false
      },
      {
        name: "Girls profiles",
        value: 10
      },
      {
        name: "Number of photos per girl profile",
        value: 10
      },
      {
        name: "Video on the profile (max. 200 mb)",
        value: 1
      },
      {
        name: "VIP profiles of girls",
        value: 5
      },
      {
        name: "Club Profile Video",
        value: 1
      },
      {
        name: "SEO",
        value: true
      },
      {
        name: "Multilingual",
        value: true
      },
      {
        name: "Personal card",
        value: true
      }
    ]
  },
  {
    id: 2,
    name: "Personal",
    price: "$170",
    permissions: [
      {
        name: "Free consultation",
        value: true
      },
      {
        name: "Credit card payment",
        value: true
      },
      {
        name: "Home Payment (per Rechhung)",
        value: true
      },
      {
        name: "club in the account",
        value: 3
      },
      {
        name: "Events",
        value: true
      },
      {
        name: "Girls profiles",
        value: 0
      },
      {
        name: "Number of photos per girl profile",
        value: 0
      },
      {
        name: "Video on the profile (max. 200 mb)",
        value: 1
      },
      {
        name: "VIP profiles of girls",
        value: 10
      },
      {
        name: "Club Profile Video",
        value: 1
      },
      {
        name: "SEO",
        value: true
      },
      {
        name: "Multilingual",
        value: true
      },
      {
        name: "Personal card",
        value: true
      }
    ]
  },
  {
    id: 3,
    name: "Premium",
    price: "$350",
    permissions: [
      {
        name: "Free consultation",
        value: true
      },
      {
        name: "Credit card payment",
        value: true
      },
      {
        name: "Home Payment (per Rechhung)",
        value: true
      },
      {
        name: "club in the account",
        value: 5
      },
      {
        name: "Events",
        value: true
      },
      {
        name: "Girls profiles",
        value: 0
      },
      {
        name: "Number of photos per girl profile",
        value: 0
      },
      {
        name: "Video on the profile (max. 200 mb)",
        value: 1
      },
      {
        name: "VIP profiles of girls",
        value: 10
      },
      {
        name: "Club Profile Video",
        value: 1
      },
      {
        name: "SEO",
        value: true
      },
      {
        name: "Multilingual",
        value: true
      },
      {
        name: "Personal card",
        value: true
      }
    ]
  }
];

function PlansBox() {
  //   const {
  //     loading,
  //     error,
  //     data: { employees }
  //   } = useQuery(GET_GIRLS);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>{error.message}</div>;

  return (
    <div className="plans">
      {plans && plans.map(plan => <PlanCard plan={plan} key={plan.id} />)}
    </div>
  );
}

export default PlansBox;
