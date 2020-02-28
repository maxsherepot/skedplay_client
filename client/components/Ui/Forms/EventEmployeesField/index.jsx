import {useTranslation} from "react-i18next";
import {useFormikContext} from "formik";
import React, {useState} from "react";
import {BlackPlusSvg, TrashSvg} from "icons";
import {
  Button,
  TextField,
  Popup,
  Badge,
} from "UI";

const EventEmployeesField = ({eventEmployees: initEventEmployees, clubEmployees: initClubEmployees}) => {
  const {t} = useTranslation();
  const {setFieldValue} = useFormikContext();

  initClubEmployees = initClubEmployees.filter(clubEmployee => {
    return initEventEmployees.findIndex(eventEmployee => eventEmployee.id === clubEmployee.id) === -1;
  });

  const [eventEmployees, setEventEmployees] = useState(initEventEmployees);
  const [clubEmployees, setClubEmployees] = useState(initClubEmployees);

  const addEmployee = (employee) => {
    const clubEmployeeIndex = clubEmployees.findIndex(e => e.id === employee.id);

    clubEmployees.splice(clubEmployeeIndex, 1);

    setClubEmployees([...clubEmployees]);

    const newEventEmployees = [...eventEmployees, employee];

    setEventEmployees(newEventEmployees);

    setFieldValue('employees_ids', newEventEmployees.map(e => e.id));
  };

  const removeEmployee = (employee) => {
    const eventEmployeeIndex = eventEmployees.findIndex(e => e.id === employee.id);

    eventEmployees.splice(eventEmployeeIndex, 1);

    const newEventEmployees = [...eventEmployees];

    setEventEmployees(newEventEmployees);

    const newClubEmployees = [...clubEmployees, employee];

    setClubEmployees(newClubEmployees);

    setFieldValue('employees_ids', newEventEmployees.map(e => e.id));
  };

  return (
    <div className="event-employees-field">
      <div style={{display: 'none'}}>
        {eventEmployees.map((employee, i) => (
          <TextField label="" key={i} name={`employees_ids[${i}]`} value={employee.id}/>
        ))}
      </div>

      <h4 className="text-2xl font-extrabold tracking-tighter leading-none mb-2">{t('account.events_actions.event_employees')}</h4>

      {!eventEmployees.length &&
        <h5 className="text-xl my-2 text-grey">{t('account.events_actions.event_no_girls')}</h5>
      }
      <div className="flex flex-wrap pt-2">
        {eventEmployees.map((employee, i) => (
          <div key={i} className="event-employee">
            <div className="relative">
              {employee.photos.length ?
                <img
                  src={employee.photos.length ? employee.photos[0].thumb_url : ''} alt=""
                />
                :
                <div className="rounded-full bg-grey" style={{width: '120px', height: '120px'}}/>
              }
              {employee.isVip &&
                <div className="absolute w-full flex justify-center pt-2" style={{bottom: '-5px'}}>
                  <Badge className="bg-red">{t('status.vip')}</Badge>
                </div>
              }
              <div className="absolute top-0 right-0 z-40 cursor-pointer">
                <div
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
                  onClick={() => removeEmployee(employee)}
                >
                  <TrashSvg />
                </div>
              </div>
            </div>
            <div className="event-employee-name text-center text-md font-bold mt-3">
              <span>
                {employee.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Popup
        trigger={
          <Button
            className="px-3"
            level="primary-black"
            outline
            size="sm"
            type="button"
          >
            <div className="flex items-center">
              <BlackPlusSvg/>
              <span className="ml-2">{t('account.events_actions.new_girl')}</span>
            </div>
          </Button>
        }
        title={t('account.events_actions.new_girl')}
        contentStyle={{
          width: '100%',
          maxWidth: "800px",
        }}
      >
        <div className="flex justify-center flex-wrap p-2 overflow-y-scroll" style={{height: '80vh'}}>
          {!clubEmployees.length &&
          <h5>
            {t('account.events_actions.club_no_girls')}
          </h5>
          }
          {clubEmployees.map((employee, i) => (
            <div key={i} className="club-employee">
              <div className="relative">
                {employee.photos.length ?
                  <img
                    src={employee.photos.length ? employee.photos[0].thumb_url : ''} alt=""
                  />
                  :
                  <div className="rounded-full bg-grey" style={{width: '120px', height: '120px'}}/>
                }
                {employee.isVip &&
                <div className="absolute w-full flex justify-center pt-2" style={{bottom: '-5px'}}>
                  <Badge className="bg-red">{t('status.vip')}</Badge>
                </div>
                }
              </div>
              <div className="event-employee-name text-center text-md font-bold mt-3">
                <span>
                  {employee.name}
                </span>
              </div>
              <Button
                className="px-1 mt-2"
                level="primary-black"
                outline
                size="sm"
                type="button"
                onClick={e => addEmployee(employee)}
              >
                <div className="flex items-center">
                  <span className="ml-2">{t('account.events_actions.add_girl')}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default EventEmployeesField;