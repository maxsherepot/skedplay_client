/**
 * For using useSteps, add your step name in apollo cache & local query.
 */
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const STEPS = gql`
  query {
    step @client
  }
`;

function useSteps() {
  const { data: { step } = {}, client } = useQuery(STEPS);

  const setStep = step => {
    if (step !== undefined && step !== null) {
      client.writeData({
        data: {
          step
        }
      });
    }
  };
  return {
    step: step || 0,
    setStep
  };
}

export default useSteps;
