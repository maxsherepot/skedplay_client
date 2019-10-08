import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_EMPLOYEE_AD, SYNC_EMPLOYEE_PRICES } from "queries";
import { getErrors } from "utils";
import { NewAdForm } from "components/ad";
import { AdInformationStep, AdServicesAndPricesStep } from "components/steps";

const NewAdBox = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE_AD);
  const [syncEmployeePrices] = useMutation(SYNC_EMPLOYEE_PRICES);

  const onSubmitInfo = async values => {
    try {
      const {
        data: {
          createEmployee: { id }
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

      setEmployeeId(id);

      return {
        status: !!id,
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

  const onSubmitPrices = async values => {
    try {
      const {
        data: {
          createEmployee: { status, message }
        }
      } = await syncEmployeePrices({
        variables: {
          employee: employeeId,
          prices: JSON.stringify(values.prices)
        }
      });

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
        onStepSubmit={onSubmitPrices}
      >
        <AdServicesAndPricesStep />
      </NewAdForm.Step>
    </NewAdForm>
  );
};

export default NewAdBox;
