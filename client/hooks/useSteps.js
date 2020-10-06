/**
 * For using useSteps, add your step name in apollo cache & local query.
 */
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {stringify} from "query-string";

export const STEPS = gql`
  query {
    step @client
  }
`;

export const STEPS_WITH_KEY = gql`
    query {
        steps @client
    }
`;

function useSteps(key = null) {
  if (key) {
    const { data: { steps: stepsJson = '{}' } = {}, client } = useQuery(STEPS_WITH_KEY);
    const decodedSteps = JSON.parse(stepsJson);

    const setStep = step => {
      decodedSteps[key] = step;

      if (decodedSteps[key] !== undefined && decodedSteps[key] !== null) {
        client.writeData({
          data: {
            steps: JSON.stringify(decodedSteps)
          }
        });
      }
    };

    return {
      step: decodedSteps ? decodedSteps[key] || 0 : 0,
      setStep
    };
  }

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
