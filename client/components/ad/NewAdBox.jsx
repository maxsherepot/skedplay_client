import { useMutation } from "@apollo/react-hooks";

import { CREATE_EMPLOYEE_AD } from "queries";
import { getErrors } from "utils";
import { NewAdForm } from "components/ad";
import { AdInformationStep, AdServicesAndPricesStep } from "components/steps";

const NewAdBox = () => {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE_AD);

  const onSubmitInfo = async values => {
    try {
      console.log(values)
      const {
        data: {
          createEmployee: { status, message }
        }
      } = await createEmployee({
        variables: {
          input: values
        }
      })

        return {
          status,
          message
        };
    } catch (e) {
      const errors = getErrors(e);

        return {
          status: false,
          message: "Server error",
          errors
        };
    }
  };

  return (
    <NewAdForm onSubmit={() => console.log("final step")}>
      <NewAdForm.Step
        validationSchema={AdInformationStep.validationSchema}
        onStepSubmit={onSubmitInfo}
      >
        <AdInformationStep />
      </NewAdForm.Step>
      
      <NewAdForm.Step
        validationSchema={AdServicesAndPricesStep.validationSchema}
        onStepSubmit={onSubmitInfo}
      >
        <AdServicesAndPricesStep />
      </NewAdForm.Step>
    </NewAdForm>
  );
};

export default NewAdBox;
