import React from "react";
import moment from "moment";
import {useMutation} from "@apollo/react-hooks";
import {
  SYNC_EMPLOYEE_PRICES,
  SYNC_EMPLOYEE_SERVICES,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_SCHEDULE,
  UPDATE_USER,
  UPLOAD_EMPLOYEE_FILES,
} from "queries";
import {Tab, Panel} from "UI";
import {Tabs} from "@bumaga/tabs";
import { useSteps } from "hooks";

import {defaultSchedule, getErrors} from "utils";
import {employeeRules} from "rules";
import {EditEmployeeForm} from "components/employee";
import {AdInformationStep, AdMediaStep, AdScheduleStep, AdServicesAndPricesStep,} from 'components/steps';
import StepBox from "components/StepBox";
import {useTranslation} from "react-i18next";

const EditEmployeeBox = ({ employee, refetchEmployee }) => {
  const {t, i18n} = useTranslation();
  const { step, setStep } = useSteps();

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [syncEmployeePrices] = useMutation(SYNC_EMPLOYEE_PRICES);
  const [syncEmployeeServices] = useMutation(SYNC_EMPLOYEE_SERVICES);
  const [uploadEmployeeFiles] = useMutation(UPLOAD_EMPLOYEE_FILES);
  const [updateEmployeeSchedule] = useMutation(UPDATE_EMPLOYEE_SCHEDULE);
  const [updateUser] = useMutation(UPDATE_USER);

  let parameters = {};
  let services = {};
  let prices = {};
  employee.parameters.forEach(s => parameters[s.parameter.id] = s.parameter_option.id);

  employee.services.forEach(s => {
    services[s.id] = {
      active: true,
      price: s.pivot.price,
    }
  });

  employee.prices.forEach(p => prices[p.id] = p.pivot.price);

  const initialValues = {
    name: `${employee.first_name} ${employee.last_name}`,
    birthday: moment(employee.birthday).format('DD.MM.YYYY'),
    gender: employee.gender,
    service_for: employee.service_for || [],
    race_type_id: employee.race_type_id,
    type: employee.type,
    description: employee.description,
    index: employee.index,
    // city_id: employee.city_id,
    address: employee.address,
    //phone: employee.phone,
    email: employee.email,
    website: employee.website,
    prices,
    services,
    parameters,
    languages: (employee.languages || []).map(l => ({code: l.code, stars: l.pivot.stars})),
    schedule: defaultSchedule(employee.schedule),
    will_activate_at: employee.will_activate_at,
    photos: [],
    videos: [],
    custom_properties: [],
  };

  const onSubmitInfo = async values => {
    delete values.language;
    delete values.undefined;
    try {
      delete values.will_activate_at;
      delete values.custom_properties;

      const [first_name, last_name] = values.name.split(' ');

      const {
        data: {
          updateEmployee: {status, message}
        }
      } = await updateEmployee({
        variables: {
          employee: employee.id,
          input: {
            ...values,
            first_name,
            last_name,
            schedule: JSON.stringify(values.schedule),
            prices: JSON.stringify(values.prices),
            services: JSON.stringify(values.services),
            parameters: JSON.stringify(values.parameters),
            languages: JSON.stringify(values.languages),
          }
        }
      });

      // const {
      //   data: {
      //     updateUser: {}
      //   }
      // } = await updateUser({
      //   variables: {
      //     user: employee.owner.id,
      //     input: {
      //       phone: values.phone,
      //       birthday: values.birthday,
      //       email: values.email,
      //     }
      //   }
      // });

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
          files: values.photos,
          custom_properties: JSON.stringify(values.custom_properties),
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
          files: values.videos,
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
      let payload = values.schedule.map(({ day, start, end, order, club_id, address, at_address}) => {
        const clubInt = parseInt(club_id);

        return {
          day,
          start: start === 0 ? null : start,
          end: start === 0 ? null : end,
          available: start !== 0 && start !== 'day_off',
          order,
          employee_id: parseInt(employee.id),
          club_id: at_address ? null : clubInt,
          address: at_address ? address : null,
          at_address: !!at_address,
        }
      });

      const {
        data: {
          updateEmployeeSchedule: { status, message }
        }
      } = await updateEmployeeSchedule({
        variables: {
          input: {
            schedules: payload,
            will_activate_at: values.will_activate_at || new Date(),
          },
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

  const links = [
    t('account.card_information'),
    t('account.services_and_price'),
    t('account.photos_and_videos'),
    t('account.schedule_and_activation')
  ];

  return (
      <>
        <Tabs>
          <div className="hd:w-7/12 mx-auto px-8 hd:px-0 pt-12">
            {links.map((link, index) => (
              <Tab onClick={() => setStep(index)} key={index}>{link}</Tab>
            ))}
          </div>

          <div className="border-t border-divider"/>

          <EditEmployeeForm
            initialValues={initialValues}
          >
            <Panel>
              <EditEmployeeForm.Step
                validationSchema={employeeRules}
                onStepSubmit={onSubmitInfo}
              >
                <AdInformationStep />
              </EditEmployeeForm.Step>
            </Panel>

            <Panel>
              <EditEmployeeForm.Step onStepSubmit={onSubmitPricesAndServices}>
                <AdServicesAndPricesStep/>
              </EditEmployeeForm.Step>
            </Panel>

            <Panel>
              <EditEmployeeForm.Step onStepSubmit={onSubmitMedia} showSubmit={false}>
                <AdMediaStep employeeId={employee.id} photos={employee.photos} refetchEmployee={refetchEmployee} videos={employee.videos} onSubmitMedia={onSubmitMedia} />
              </EditEmployeeForm.Step>
            </Panel>

            <Panel>
              <EditEmployeeForm.Step onStepSubmit={onSubmitSchedule}>
                <AdScheduleStep />
              </EditEmployeeForm.Step>
            </Panel>
          </EditEmployeeForm>
        </Tabs>



        {/*<div className="border-b border-divider" />*/}
      </>
  );
};

export default EditEmployeeBox;
