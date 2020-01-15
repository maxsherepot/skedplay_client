import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowPrevSvg, ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, Gallery, ChatList, ChatRoom } from "UI";
import { GET_EMPLOYEE, ALL_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";
import Centrifugo from "components/centrifuge";
import cx from "classnames";
import {useTranslation} from "react-i18next";


const ClientChatComponent = ({ user, type = 'client' }) => {
  const router = useRouter();
  const { id } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, toggleModalOpen] = useState(false);
  const [employeeInited, employeeInit] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const {t, i18n} = useTranslation();

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  let { data: { chats } = [], loading: chatsLoading, refetch: refetchChats } = useQuery(
    ALL_CHATS
  );

  if (employeeLoading || chatsLoading) {
    return t('common.loading');
  }

  let chatByReceiver = chats.find(c => c.receiver.id === parseInt(id));

  if (!chatByReceiver && !chats.find(c => c.id === null)) {
    chats.unshift({
      id: null,
      receiver: employee,
      messages: [],
      active: true,
    });
  }

  Centrifugo.init().then(centrifuge => {
    let chatsChannel = type === 'client'
      ? 'client_chats:' + user.id
      : 'employee_chats:' + user.employee.id;

    centrifuge.subscribe(chatsChannel, data => {
      console.log(data);

      if (data.data.action === 'refresh') {
        console.log('refreshing chats');
        refetchChats();
      } else {
        console.log('not need to refresh chats');
      }
    });
  });

  const selectChat = function(chatId) {
    chats = chats.map(chat => {
      if (chat.id === chatId && (!selectedChat || chatId !== selectedChat.id)) {
        setSelectedChat(chat);
      }

      return chat;
    });
  }.bind(this);

  if (!employeeInited) {
    setSelectedChat(chats[0]);
    employeeInit(true);
  }

  const handleLightboxClick = index => {
    setLightboxIndex(index);
    toggleModalOpen(true);
  };

  const onClose = () => {
    setLightboxIndex(null);
    toggleModalOpen(false);
  };

  const sidebarColumn = (
    <>
      <Lightbox
        open={isModalOpen}
        index={lightboxIndex}
        onClose={onClose}
        images={employee.photos}
      />

      <Gallery
        photos={employee.photos}
        handleClick={handleLightboxClick}
        favorite={
          <FavoriteButton
            variables={{ model_id: employee.id, model_type: "employee" }}
            favorited={employee.favorited}
            large={true}
          />
        }
        {t('chat.large')}
      />
    </>
  );

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
  };

  let mobileChatBlock = (
    <div className="relative block w-full md:hidden bg-white border-2 border-black rounded-lg text-center py-3 mb-3 sm:mx-3 mt-4">
      {getMobileChooseBlock()}
    </div>
  );

  let chatRoomBlock = "";

  if (selectedChat) {
    chatRoomBlock = (
      <>
        <div className={cx([
          selectedChat ? "block" : "hidden md:block",
          "w-full sm:w-full md:w-2/3 xl:w-6/12 px-3"
        ])}>
          <div className="text-2xl font-extrabold my-5 sm:hidden md:block">{t('chat.chat_with')} {selectedChat.receiver.name}</div>
          <div>
            <ChatRoom type={type} selectedChat={selectedChat} refetchChats={refetchChats}></ChatRoom>
          </div>
        </div>
      </>
    );
  }

  const chatsBlock = (
    <>
      <div className={cx([
        selectedChat ? "hidden md:block" : "block",
        "w-full sm:w-full md:w-1/3 xl:w-3/12 px-3"
      ])}>
        <div className="text-2xl font-extrabold my-5 sm:hidden md:block">{t('layout.contacts')}</div>
        <div>
          <ChatList chats={chats} selectedChat={selectedChat} selectChat={selectChat}></ChatList>
        </div>
      </div>
    </>
  );

  return (
    <EmployeeBox employee={employee} user={user} viewed={false}>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
        <div className="hidden w-full xl:block xl:w-3/12 px-3">
          <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
          {sidebarColumn}
        </div>

        {mobileChatBlock}

        {chatRoomBlock}

        {chatsBlock}
      </div>
    </EmployeeBox>
  );
};

ClientChatComponent.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

ClientChatComponent.getLayout = (page) => page;

export default ClientChatComponent;
