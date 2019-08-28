/**
 * For using useSteps, add your step name in apollo cache & local query.
 */
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_REGISTER_STEP } from "queries";

function useSteps(name) {
  const { data, client } = useQuery(GET_CURRENT_REGISTER_STEP);

  const setStep = step => {
    client.writeData({
      data: {
        steps: {
          [name]: step,
          __typename: "Steps"
        }
      }
    });
  };

  return {
    step: (name && data && data.steps && data.steps[name]) || 0,
    setStep
  };
}

export default useSteps;
