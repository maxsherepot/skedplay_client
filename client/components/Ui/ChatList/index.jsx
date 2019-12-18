import React from "react";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";
import { Badge, Slick } from "UI";
import { FavoriteButton } from "components/favorite";
import { MessageSvg, CocktailSvg } from "icons";
import {useRouter} from "next/router";

function ChatList({
  user,
  chats,
  selectChat,
  type = 'client',
  selectedChat = null,
}) {
  let now = moment.utc();

  if (selectedChat) {
    // chats.find(c => c.id === selectedChat.id).active = true;
    //
    // let receiverTypeId = type === 'client' ? 'employee_id' : 'client_id';
    //
    // let topChatIndex = chats.findIndex(c => c[receiverTypeId] === receiverId);
    //
    // if (topChatIndex) {
    //   let topChat = chats.splice(topChatIndex, 1);
    //   chats.unshift(topChat);
    // } else {
    //   // TODO add chat
    // }
  }

  chats = chats.map((chat, i) => {
    chat.active = i === 0;
    let lastMessageDate = moment.utc(chat.last_message_date);
    let diffInDays = Math.abs(lastMessageDate.diff(now, 'days'));

    if (diffInDays > 0) {
      chat.date = diffInDays + ' day';
    } else {
      chat.date = lastMessageDate.local().format('HH:mm');
    }

    chat.active = false;

    if (selectedChat && selectedChat.id === chat.id) {
      chat.active = true;
    }

    return chat;
  });

  let unreadCountBadge = function(chat) {
    if (!chat.unread_messages_count) {
      return;
    }

    return (
      <div
        className={cx(
          "inline-block",
          "text-sm",
          "badge",
          "text-center",
          chat.unread_messages_count === 0 ? "hidden" : "",
          chat.active ? "bg-white text-pink" : "bg-pink text-white"
        )}
      >+{chat.unread_messages_count}</div>
    )
  };

  return (
    <div className="chats rounded-lg overflow-y-scroll">
      {chats.map(chat => (
        <div
          className={cx(
            "chats__item",
            "cursor-pointer",
            chat.active ? "active" : ""
          )}
          key={chat.id}
          onClick={(e) => selectChat(chat.id)}
        >
          <div className="avatar empty"></div>
          <div className="flex flex-col">
            <div className="font-bold">{chat.receiver.name}</div>
            <div className="text-sm text-grey">
              <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"></div>
              150 km from me
            </div>
          </div>
          <div className="flex-grow text-right flex flex-col flex-grow">
            <div
              className={cx(
                chat.active ? "text-white" : "text-light-grey"
              )}
            >{chat.date}</div>
            <div>
              {unreadCountBadge(chat)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


ChatList.propTypes = {
  chats: PropTypes.array,
  type: PropTypes.string,
  topChatId: PropTypes.number,
};

export default ChatList;
