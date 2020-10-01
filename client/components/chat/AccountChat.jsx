import React, { useState, useEffect } from "react";
import EmployeeClientChat from "components/chat/EmployeeClientChat";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {Loader, SelectField, ArrowBack} from "UI";
import {Formik} from "formik";
import Link from 'components/SlashedLink'
import {ProfileHeader} from "../account/AccountLayout";
import {useTranslation} from "react-i18next";

const Breadcrumbs = () => {
  const {t, i18n} = useTranslation();

  return (
    <div className="container">
      <div className="flex items-center py-4">
        <ArrowBack back />
        <div className="ml-10 hidden sm:block">
          <Link href="/account">
            <a className="text-red hover:text-pink">{t('account.my_account')}</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          <Link href="/account/messages-and-chats">
            <a className="text-red hover:text-pink">{t('account.messages_and_chats')}</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          {t('account.chats')}
        </div>
      </div>
    </div>
  );
};

const AccountChat = ({ user, chatType, selectedEmployeeId = null, selectedChatId = null }) => {
  const {t, i18n} = useTranslation();

  if (user.is_employee || user.is_client_chat_member || chatType === 'admin') {
    return (
      <>
        <Breadcrumbs/>
        <div className="container hidden sm:block -mt- -ml-10 -mb-4">
             <ProfileHeader user={user}/>
        </div>
        <div className="container mb-16" style={{maxWidth: 1100}}>
            <EmployeeClientChat user={user} chatType={chatType} selectedChatId={selectedChatId}/>
        </div>
      </>
    )
  }

  const { loading, error, data } = useQuery(gql `
      query clubOwnerWithEmployees {
          me {
              id
              employees_club_owners {
                  id
                  name
                  club {
                      id
                      name
                  }
              }
          }
      }
  `);

  const [selectedEmployee, selectEmployee] = useState(null);

  if (loading) {
    return (
      <>
        <Loader/>
        <Breadcrumbs/>
      </>
    );
  }

  if (selectedEmployeeId && !selectedEmployee) {
    selectEmployee(data.me.employees_club_owners.find(e => parseInt(e.id) === parseInt(selectedEmployeeId)))
  }

  return (
    <>
      <Breadcrumbs/>
      <div className="flex justify-center">
        <Formik initialValues={{employee_id: selectedEmployeeId || ""}} onSubmit={() => {}}>
          <SelectField
            className="w-full sm:w-1/4 lg:w-2/6 px-2"
            // inputClassName="w-full md:w-1/3"
            label=""
            name="employee_id"
            options={data.me.employees_club_owners.map(e => ({label: `${e.name} / ${e.club.name}`, value: e.id}))}
            placeholder={t('chat.select_employee')}
            onSelect={employeeId => selectEmployee(data.me.employees_club_owners.find(e => e.id === employeeId))}
          />
        </Formik>
      </div>

      {selectedEmployee &&
        <EmployeeClientChat user={user} employeeId={selectedEmployee.id} selectedChatId={selectedChatId} key={selectedEmployee.id}/>
      }
    </>
  );
};

export default AccountChat;
