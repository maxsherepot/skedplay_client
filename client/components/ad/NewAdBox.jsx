import { useMutation } from "@apollo/react-hooks";

import { CREATE_EMPLOYEE_AD } from "queries";
import { getErrors } from "utils";
import { NewAdForm } from "components/ad";
import { AdInformationStep, AdServicesAndPricesStep } from "components/steps";

const NewAdBox = () => {
  const [createEmployee] = useMutation(CREATE_EMPLOYEE_AD);

  const onSubmitInfo = async values => {
    try {
      const {
        data: {
          createEmployee: { employee }
        }
      } = await createEmployee({
        variables: {
          input: {
            ...values,
            prices: JSON.stringify(values.prices),
            parameters: JSON.stringify(values.parameters)
          }
        }
      });

      console.log(employee)

      return {
        status: !!employee,
        message: ""
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
