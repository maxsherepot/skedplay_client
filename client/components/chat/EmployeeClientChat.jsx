import React, { useState, useEffect } from "react";
import { ArrowPrevSvg, } from "icons";
import { ChatList, ChatRoom } from "UI";
import { ALL_CHATS, ALL_ADMIN_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import Centrifugo from "components/centrifuge";
import { Loader } from "UI";
import cx from "classnames";
import {useTranslation} from "react-i18next";

const EmployeeClientChat = ({ user, employeeId, chatType, selectedChatId, employee }) => {
  let type = user.is_employee || user.is_club_owner ? 'employee' : 'client';

  const {t, i18n} = useTranslation();

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatType, setSelectedChatType] = useState(chatType || 'simple');

  let { data: { chats: simpleChats } = [], loading: chatsLoading, refetch: refetchSimpleChats } = useQuery(
    ALL_CHATS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        employeeId: employeeId
      }
    }
  );

  let { data: { adminChats } = [], loading: adminChatsLoading, refetch: refetchAdminChats } = useQuery(
    ALL_ADMIN_CHATS,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const refetchChats = () => {
    refetchSimpleChats();
    refetchAdminChats();
  };

  if (chatsLoading || adminChatsLoading) {
    return <Loader/>;
  }

  const adminChatsHandled = !employeeId ? adminChats.map(c => ({...c, type: 'admin'})) : [];

  let chats = [
    ...simpleChats.map(c => ({...c, type: 'simple'})),
    ...adminChatsHandled,
  ]
    .sort((chat1, chat2) => {
      if (chat1.last_message_date > chat2.last_message_date) {
        return -1;
      }

      if (chat1.last_message_date < chat2.last_message_date) {
        return 1;
      }

      return 0;
    });

  const selectChat = function(chatId, type = 'simple') {
    chatId = parseInt(chatId);

    if (
      selectedChat
      && chatId === parseInt(selectedChat.id)
      && selectedChatType === type
    ) {
      return;
    }

    let chatsStore;

    if (type === "simple") {
      chatsStore = chats;
    } else {
      chatsStore = adminChats;
    }

    const chat = chatsStore.find(c => parseInt(c.id) === chatId);

    if (chat) {
      setSelectedChat(chat);
      setSelectedChatType(type);
    }
  }.bind(this);

  if (!!selectedChatId && !selectedChat) {
    selectChat(selectedChatId, chatType)
  }

  if (employee && type === 'client') {
    let chatByReceiver = chats.find(c => c.receiver.id === parseInt(employee.id));

    if (!chatByReceiver && !chats.find(c => c.id === null)) {
      chats.unshift({
        id: null,
        employee_id: employee.id,
        client_id: user.id,
        receiver: employee,
        messages: [],
        active: true,
      });

      if (!selectedChat) {
        setSelectedChat(chats[0]);
      }
    } else if (chatByReceiver && !selectedChat) {
      chats = [chatByReceiver, ...chats.filter(c => c.id !== chatByReceiver.id)];
      setSelectedChat(chats[0]);
    }
  }

  Centrifugo.init().then(centrifuge => {
    const subscribe = (data, type) => {
      if (data.data.action === 'refresh') {
        console.log('refreshing chats');

        if (type === 'simple') {
          refetchSimpleChats();
        } else if (type === 'admin') {
          refetchAdminChats();
        }
      } else {
        console.log('not need to refresh chats');
      }
    };

    let chatsChannel = null;

    if (type === 'client') {
      chatsChannel = 'client_chats:' + user.id;
    } else {
      if (employeeId || user.employee) {
        chatsChannel = 'employee_chats:' + (employeeId || user.employee.id);
      }
    }

    const adminChatsChannel = user.is_admin
      ? 'admin_chats'
      : 'user_admin_chats:' + user.id;

    if (chatsChannel && !centrifuge.getSub(chatsChannel)) {
      centrifuge.subscribe(chatsChannel, data => subscribe(data, 'simple'));
    }

    if (!centrifuge.getSub(adminChatsChannel)) {
      centrifuge.subscribe(adminChatsChannel, data => subscribe(data, 'admin'));
    }
  });

  let mobileChoosedBlock = (
    <>
      <div
        className="absolute"
        style={{
          top: '33%',
          left: '10px',
        }}
      >
        <a
          className={cx(
            "animation-arrow-left text-sm cursor-pointer",
          )}
          onClick={e => {setSelectedChat(null)}}
        >
          <ArrowPrevSvg className="stroke-red">
            <span className="xs:hidden sm:inline-block ml-2">{t('chat.all')}</span>
          </ArrowPrevSvg>
        </a>
      </div>
      <span className="font-bold text-2xl">
          {t('chat.chat_with')} {selectedChat && selectedChat.receiver.name}
      </span>
    </>
  );

  let mobileChoseBlock = (
    <>
      <span className="font-bold text-2xl">
          {t('chat.chose_chat')}
      </span>
    </>
  );

  function getMobileChooseBlock() {
    if (selectedChat) {
      return mobileChoosedBlock;
    }

    return mobileChoseBlock;
  }

  let mobileChatBlock = (
    <div className="relative block w-full md:hidden bg-white border-2 border-black rounded-lg text-center py-3 mb-3 sm:mx-3 mt-4">
      {getMobileChooseBlock()}
    </div>
  );

  let chatRoomBlock = (
    <>
      <div
        className={cx([
          selectedChat ? "block" : "hidden md:block",
          "w-full sm:w-full md:w-2/3 px-3 mb-3"
        ])}
      >
        <div className="text-2xl font-extrabold my-5">{t('chat.chose_chat')}</div>
      </div>
    </>
  );

  if (selectedChat) {
    chatRoomBlock = (
      <>
        <div
          className={cx([
            selectedChat ? "block" : "hidden md:block",
            "w-full sm:w-full md:w-2/3 px-3"
          ])}
        >
          <div className="text-2xl font-extrabold my-5 sm:hidden md:block">{t('chat.chat_with')} {selectedChat.receiver.name}</div>
          <div>
            <ChatRoom user={user} type={type} selectedChatType={selectedChatType} selectedChat={selectedChat} refetchChats={refetchChats}/>
          </div>
        </div>
      </>
    );
  }

  const chatsBlock = (
    <>
      <div
        className={cx([
          selectedChat ? "hidden md:block" : "block",
          "w-full sm:w-full md:w-1/3 px-3 mb-3"
        ])}
      >
        <div className="text-2xl font-extrabold my-5 sm:hidden md:block">{t('layout.contacts')}</div>
        <div>
          <ChatList type={type} chats={chats} selectedChatType={selectedChatType} selectedChat={selectedChat} selectChat={selectChat}/>
        </div>
      </div>
    </>
  );

  if (type === 'client' && employee) {
    return (
      <div className="flex flex-col sm:flex-row flex-wrap">
        {mobileChatBlock}
        {chatRoomBlock}
        {chatsBlock}
      </div>
    );
  }

  return (
    <>
      <div className="fluid-container">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex flex-col sm:flex-row flex-wrap -mx-3 bg-xs-grey rounded-lg">
            {mobileChatBlock}
            {chatRoomBlock}
            {chatsBlock}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeClientChat;