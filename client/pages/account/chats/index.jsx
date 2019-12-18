import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, Gallery, ChatList, ChatRoom } from "UI";
import { GET_EMPLOYEE, ALL_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import Centrifugo from "components/centrifuge";
import { ArrowBack } from "UI";

const EmployeeChatComponent = ({ user }) => {
  let type = user.employee ? 'employee' : 'client';

  const Breadcrumbs = () => (
    <div className="fluid-container">
      <div className="flex items-center py-4">
        <ArrowBack back />
        <div className="ml-10">
          <Link href="/account">
            <a className="text-red hover:text-pink">My account</a>
          </Link>
          <span className="px-2 text-grey">/</span>
          Chats
        </div>
      </div>
    </div>
  );

  const [selectedChat, setSelectedChat] = useState(null);

  let { data: { chats } = [], loading: chatsLoading, refetch: refetchChats } = useQuery(
    ALL_CHATS
  );

  if (chatsLoading) {
    return "Loading...";
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

  let chatRoomBlock = (
    <>
      <div className="w-full sm:w-3/5 hd:w-2/3 px-3 mb-3">
        <div className="text-2xl font-extrabold my-5">Please select the chat</div>
      </div>
    </>
  );

  if (selectedChat) {
    chatRoomBlock = (
      <>
        <div className="w-full sm:w-3/5 hd:w-2/3 px-3 mb-3">
          <div className="text-2xl font-extrabold my-5">Chat with {selectedChat.receiver.name}</div>
          <div>
            <ChatRoom type={type} selectedChat={selectedChat}></ChatRoom>
          </div>
        </div>
      </>
    );
  }

  const chatsBlock = (
    <>
      <div className="w-full sm:w-2/5 hd:w-1/3 px-3 mb-3">
        <div className="text-2xl font-extrabold my-5">Contacts</div>
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