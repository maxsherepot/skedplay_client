/**
 * For using useSteps, add your step name in apollo cache & local query.
 */
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const STEPS = gql`
  query {
    steps {
      register @client
      forgot @client
      newAd @client
      __typename
    }
  }
`;

function useSteps(name) {
  const { data: { steps } = {}, client } = useQuery(STEPS);

  const setStep = step => {
    if (step) {
      client.writeData({
        data: {
          steps: {
            ...steps,
            [name]: step
          }
        }
      });
    }
  };
  return {
    step: (name && steps && steps[name]) || 0,
    setStep
  };
}

export default useSteps;
