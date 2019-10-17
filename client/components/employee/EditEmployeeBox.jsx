import React from "react";
import {useMutation} from "@apollo/react-hooks";
import {
  UPDATE_EMPLOYEE,
  SYNC_EMPLOYEE_PRICES,
  SYNC_EMPLOYEE_SERVICES,
  UPLOAD_EMPLOYEE_FILES,
  UPDATE_EMPLOYEE_SCHEDULE,
} from "queries";

import {getErrors, defaultSchedule} from "utils";
import {employeeRules} from "rules";
import {EditEmployeeForm} from "components/employee";
import {
  AdInformationStep,
  AdServicesAndPricesStep,
  AdMediaStep,
  AdScheduleStep,
} from 'components/steps';

const EditEmployeeBox = ({ employee }) => {
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [syncEmployeePrices] = useMutation(SYNC_EMPLOYEE_PRICES);
  const [syncEmployeeServices] = useMutation(SYNC_EMPLOYEE_SERVICES);
  const [uploadEmployeeFiles] = useMutation(UPLOAD_EMPLOYEE_FILES);
  const [updateEmployeeSchedule] = useMutation(UPDATE_EMPLOYEE_SCHEDULE);

  let parameters = {};
  let services = {};
  let prices = {};
  employee.parameters.forEach(s => parameters[s.id] = s.pivot.value);

  employee.services.forEach(s => {
    services[s.id] = {
      active: true,
      price: s.pivot.price,
    }
  });

  employee.prices.forEach(p => prices[p.id] = p.pivot.price);

  const initialValues = {
    name: employee.name,
    birthday: employee.birthday,
    gender: employee.gender,
    race_type_id: employee.race_type_id,
    type: employee.type,
    description: employee.description,
    index: employee.index,
    city: employee.city,
    address: employee.address,
    phone: employee.phone,
    email: employee.email,
    website: employee.website,
    prices,
    services,
    parameters,
    schedule: defaultSchedule(employee.schedule),
    photos: [],
    videos: []
  };

  const onSubmitInfo = async values => {
    try {
      const {
        data: {
          updateEmployee: {status, message}
        }
      } = await updateEmployee({
        variables: {
          employee: employee.id,
          input: {
            ...values,
            schedule: JSON.stringify(values.schedule),
            prices: JSON.stringify(values.prices),
            services: JSON.stringify(values.services),
            parameters: JSON.stringify(values.parameters)
          }
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

  const onSubmitPricesAndServices = async values => {
    try {
      const {
        data: {
          syncEmployeePrices: { status: priceStatus, message: priceMessage }
        }
      } = await syncEmployeePrices({
        variables: {
          employee: employee.id,
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
          employee: employee.id,
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
          employee: employee.id,
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
          employee: employee.id,
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
      let payload = values.schedule.map(({ day, start, end, order, club_id, }) => {
        return {
          day,
          start: start === 0 ? null : start,
          end: start === 0 ? null : end,
          available: start !== 0,
          order,
          employee_id: employee.id,
          club_id: club_id
        }

      });

      const {
        data: {
          updateEmployeeSchedule: { status, message }
        }
      } = await updateEmployeeSchedule({
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
      <EditEmployeeForm initialValues={initialValues}>
        <EditEmployeeForm.Step
            validationSchema={employeeRules}
            onStepSubmit={onSubmitInfo}
        >
          <AdInformationStep />
        </EditEmployeeForm.Step>

        <EditEmployeeForm.Step onStepSubmit={onSubmitPricesAndServices}>
          <AdServicesAndPricesStep/>
        </EditEmployeeForm.Step>

        <EditEmployeeForm.Step onStepSubmit={onSubmitMedia}>
          <AdMediaStep photos={employee.photos} videos={employee.videos} />
        </EditEmployeeForm.Step>

        <EditEmployeeForm.Step onStepSubmit={onSubmitSchedule}>
          <AdScheduleStep />
        </EditEmployeeForm.Step>
      </EditEmployeeForm>
  );
};

export default EditEmployeeBox;
