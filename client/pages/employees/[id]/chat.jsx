import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import checkLoggedIn from "lib/checkLoggedIn";
import { ArrowNextSvg, RatingSvg, CocktailSvg } from "icons";
import { Lightbox, Gallery, ChatList, ChatRoom } from "UI";
import { GET_EMPLOYEE, ALL_CHATS } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { FavoriteButton } from "components/favorite";
import EmployeeBox from "components/employee/EmployeeBox";

const ChatComponent = ({ user, type = 'client' }) => {
  const router = useRouter();
  const { id } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, toggleModalOpen] = useState(false);

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  let { data: { chats } = [], loading: chatsLoading } = useQuery(
    ALL_CHATS
  );

  if (employeeLoading || chatsLoading) {
    return "Loading...";
  }

  // let receiverTypeId = type === 'client' ? 'employee_id' : 'client_id';

  let chatByReceiver = chats.find(c => c.receiver.id === parseInt(id));

  if (!chatByReceiver) {
    chats.unshift({
      id: null,
      receiver: employee,
      messages: [],
      active: true,
    });
  }

  let selectedChat = chats[0];

  const selectChat = function(chatId) {
    console.log(chatId);
    chats = chats.map(chat => {
      if (chat.id === chatId) {
        chat.active = true;
        selectedChat = chat;
      } else {
        chat.active = false;
      }

      return chat;
    });
  }.bind(this);

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
        large
      />
    </>
  );

  const chatRoomBlock = (
    <>
      <div className="w-full sm:w-3/5 hd:w-2/3 px-3">
        <div className="text-2xl font-extrabold my-5">Chat with {selectedChat.receiver.name}</div>
        <div>
          <ChatRoom selectedChat={selectedChat}></ChatRoom>
        </div>
      </div>
    </>
  );

  const chatsBlock = (
    <>
      <div className="w-full sm:w-2/5 hd:w-1/3 px-3">
        <div className="text-2xl font-extrabold my-5">Contacts</div>
        <div>
          <ChatList chats={chats} selectedChat={selectedChat} selectChat={selectChat}></ChatList>
        </div>
      </div>
    </>
  );

  return (
    <EmployeeBox employee={employee} user={user}>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-3">
        <div className="w-full sm:hidden hd:w-1/5 px-3">
          <div className="text-2xl font-extrabold my-5">Fotogalerie</div>
          {sidebarColumn}
        </div>
        {chatRoomBlock}
        {chatsBlock}
      </div>
    </EmployeeBox>
  );
};

ChatComponent.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

ChatComponent.getLayout = (page) => page;

export default ChatComponent;
