import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowPrevSvg, ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, Gallery, ChatList, ChatRoom } from "UI";
import { GET_EMPLOYEE, ALL_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import Centrifugo from "components/centrifuge";
import { ArrowBack } from "UI";
import cx from "classnames";
import {useTranslation} from "react-i18next";

const EmployeeChatComponent = ({ user }) => {
  let type = user.employee ? 'employee' : 'client';

    const {t, i18n} = useTranslation();

    const Breadcrumbs = () => (
    <div className="fluid-container">
      <div className="flex items-center py-4">
        <ArrowBack back />
        <div className="ml-10">
          <Link href="/account">
            <a className="text-red hover:text-pink">{t('account.my_account')}</a>
          </Link>
          <span className="px-2 text-grey">/</span>
            {t('account.chats')}
        </div>
      </div>
    </div>
  );

  const [selectedChat, setSelectedChat] = useState(null);

  let { data: { chats } = [], loading: chatsLoading, refetch: refetchChats } = useQuery(
    ALL_CHATS
  );

  if (chatsLoading) {
    return t('common.loading');
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

  let chatRoomBlock = (
    <>
      <div
        className={cx([
          selectedChat ? "block" : "hidden md:block",
          "w-full sm:w-full md:w-2/3 px-3 mb-3"
        ])}
      >
        <div className="text-2xl font-extrabold my-5">{t('chat.select_chat')}</div>
      </div>
    </>
  );

  if (selectedChat) {
    chatRoomBlock = (
      <>
        <div
          className={cx([
            selectedChat ? "block" : "hidden md:block",
            "w-full sm:w-full md:w-2/3 px-3 mb-3"
          ])}
        >
          <div className="text-2xl font-extrabold my-5 sm:hidden md:block">{t('chat.chat_with')} {selectedChat.receiver.name}</div>
          <div>
            <ChatRoom type={type} selectedChat={selectedChat}></ChatRoom>
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
          <ChatList type={type} chats={chats} selectedChat={selectedChat} selectChat={selectChat}></ChatList>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Breadcrumbs />
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

EmployeeChatComponent.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

// EmployeeChatComponent.getLayout = getLayout;

export default EmployeeChatComponent;