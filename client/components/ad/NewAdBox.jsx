import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  CREATE_EMPLOYEE_AD,
  SYNC_EMPLOYEE_PRICES,
  SYNC_EMPLOYEE_SERVICES,
  UPLOAD_EMPLOYEE_FILES,
  CREATE_EMPLOYEE_SCHEDULE,
} from "queries";
import { getErrors } from "utils";
import { NewAdForm } from "components/ad";
import {
  AdInformationStep,
  AdServicesAndPricesStep,
  AdMediaStep,
  AdScheduleStep,
} from "components/steps";

const NewAdBox = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE_AD);
  const [syncEmployeePrices] = useMutation(SYNC_EMPLOYEE_PRICES);
  const [syncEmployeeServices] = useMutation(SYNC_EMPLOYEE_SERVICES);
  const [uploadEmployeeFiles] = useMutation(UPLOAD_EMPLOYEE_FILES);
  const [createEmployeeSchedule] = useMutation(CREATE_EMPLOYEE_SCHEDULE);

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
            schedule: JSON.stringify(values.schedule),
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

  const onSubmitSchedule = async values => {
    try {
      let payload = values.schedule.map(({ day, start, end, available, order, club_id, }) => {
        return {
          day,
          start: start === 0 ? null : start,
          end: start === 0 ? null : end,
          available: start !== 0,
          order,
          employee_id: employeeId,
          club_id: club_id
        }

      });
      const {
        data: {
          createEmployeeSchedule: { status, message }
        }
      } = await createEmployeeSchedule({
        variables: {
          input: payload,
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

      <NewAdForm.Step
        validationSchema={AdScheduleStep.validationSchema}
        onStepSubmit={onSubmitSchedule}
      >
        <AdScheduleStep />
      </NewAdForm.Step>
    </NewAdForm>
  );
};

export default NewAdBox;
