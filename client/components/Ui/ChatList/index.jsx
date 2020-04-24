import React from "react";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import cx from "classnames";
import {useTranslation} from "react-i18next";

function ChatList({
  user,
  chats,
  selectChat,
  type = 'client',
  selectedChatType = 'simple',
  selectedChat = null,
}) {
  let now = moment.utc();

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
      chat.unread_messages_count = 0;
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
  const {t, i18n} = useTranslation();

  return (
    <div className="chats rounded-lg overflow-y-scroll">
      {chats.map(chat => (
        <div
          className={cx(
            "chats__item",
            "cursor-pointer",
            chat.active ? "active" : ""
          )}
          key={chat.id + chat.type}
          onClick={(e) => selectChat(chat.id, chat.type)}
        >
          {chat.receiver.avatar ?
            <img className="avatar" src={chat.receiver.avatar.url}/>
            :
            <div className="avatar empty"/>
          }
          <div className="flex flex-col">
            <div className="font-bold">{chat.receiver.name}</div>
            {chat.type === 'simple' &&
              <div className="text-sm text-grey">
                <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"/>
                150 {t('index.km_from_me')}
              </div>
            }
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
