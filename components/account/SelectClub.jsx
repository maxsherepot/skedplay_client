import React, {Fragment, useState} from "react";
import cx from "classnames";
import {ChevronDownSvg} from "icons";
import { Dropdown } from "UI";
import {UPDATE_EMPLOYEE} from 'queries';
import {useMutation} from "@apollo/react-hooks";

export default ({clubs, employee, owner, className}) => {
  const [selectedClubId, selectClubId] = useState(owner.id);
  let selectedClub = clubs.find(c => parseInt(c.value) === parseInt(selectedClubId));

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const onSelectClub = async ({club_id}) => {
    selectClubId(club_id);

    await updateEmployee({
      variables: {
        employee: employee.id,
        input: {
          club_id: club_id,
        }
      }
    });
  };

  return (
    <>
      <Dropdown
        classes="w-full"
        triggerClassName="border-none"
        triggerStyle={{
          borderRadius: '0.25rem',
          backgroundColor: '#F6F6F6',
          height: '2.5rem',
        }}
        trigger={
          <div
            className={cx(
              "flex items-center h-full pl-4 text-sm truncate",
              "text-black"
            )}
          >
            {(selectedClub || {}).label}
          </div>
        }
        contentStyle={{
          border: 'none',
          borderRadius: '0.25rem',
          backgroundColor: '#F6F6F6',
        }}
      >
        {({close}) => (
          <div>
            {clubs.map((club, index) => (
              <Fragment key={index}>
                <div
                  className={cx(
                    "cursor-pointer leading-loose hover:text-red select-none",
                    parseInt(selectedClubId) === parseInt(club.value) ? "text-red" : "text-black"
                  )}
                  onClick={() => {
                    close();
                    onSelectClub({club_id: club.value})
                  }}
                >
                  {club.label}
                </div>
              </Fragment>
            ))
            }
          </div>
        )}
      </Dropdown>
    </>
  );

  return (
    <div className={cx("flex items-center justify-between bg-xs-grey rounded p-2", className)}>
      <div className="w-26 text-xs truncate">{owner.name}</div>
      <ChevronDownSvg/>
    </div>
  );
};
