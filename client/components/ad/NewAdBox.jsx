import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  CREATE_EMPLOYEE_AD,
  SYNC_EMPLOYEE_PRICES,
  SYNC_EMPLOYEE_SERVICES,
  UPLOAD_EMPLOYEE_FILES
} from "queries";
import { getErrors } from "utils";
import { NewAdForm } from "components/ad";
import {
  AdInformationStep,
  AdServicesAndPricesStep,
  AdMediaStep
} from "components/steps";

const NewAdBox = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE_AD);
  const [syncEmployeePrices] = useMutation(SYNC_EMPLOYEE_PRICES);
  const [syncEmployeeServices] = useMutation(SYNC_EMPLOYEE_SERVICES);
  const [uploadEmployeeFiles] = useMutation(UPLOAD_EMPLOYEE_FILES);

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
            services: JSON.stringify(values.services),
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

  const onSubmitPricesAndServices = async values => {
    try {
      const {
        data: {
          syncEmployeePrices: { status: priceStatus, message: priceMessage }
        }
      } = await syncEmployeePrices({
        variables: {
          employee: employeeId,
          prices: JSON.stringify(values.prices)
        }
      });

      const {
        data: {
          syncEmployeeServices: {
            status: serviceStatus,
            message: serviceMessage
          }
        }
      } = await syncEmployeeServices({
        variables: {
          employee: employeeId,
          services: JSON.stringify(values.services)
        }
      });

      return {
        status: serviceStatus && priceStatus,
        message: `${priceMessage}, ${serviceMessage}`
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

  const onSubmitMedia = async values => {
    try {
      const {
        data: {
          uploadEmployeeFiles: { status: statusPhoto, message: messagePhoto }
        }
      } = await uploadEmployeeFiles({
        variables: {
          employee: employeeId,
          collection: "employee-photo",
          files: values.photos
        }
      });

      const {
        data: {
          uploadEmployeeFiles: { status: statusVideo, message: messageVideo }
        }
      } = await uploadEmployeeFiles({
        variables: {
          employee: employeeId,
          collection: "employee-video",
          files: values.videos
        }
      });

      return {
        status: statusPhoto && statusVideo,
        message: messagePhoto || messageVideo
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
        onStepSubmit={onSubmitPricesAndServices}
      >
        <AdServicesAndPricesStep />
      </NewAdForm.Step>

      <NewAdForm.Step
        validationSchema={AdMediaStep.validationSchema}
        onStepSubmit={onSubmitMedia}
      >
        <AdMediaStep />
      </NewAdForm.Step>
    </NewAdForm>
  );
};

export default NewAdBox;
