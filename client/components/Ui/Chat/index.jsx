import React, { useEffect, useRef, createRef, useState } from 'react'
import moment from "moment-timezone";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import Link from "next/link";
import { Badge, Slick } from "UI";
import { FavoriteButton } from "components/favorite";
import { MessageSvg, CocktailSvg } from "icons";
import {useQuery, useLazyQuery, useMutation} from "@apollo/react-hooks";
import {CHAT_ROOM, SEND_MESSAGE} from "../../../queries/chatQuery";

function ChatRoom({
  chatId,
  selectedChat,
  type = 'client',
}) {

  const [messageText, setMessageText] = useState('');

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(scrollToBottom);

  let { data: { chat } = selectedChat, loading: chatLoading, refetch: refetchChat } = useQuery(
    CHAT_ROOM,
    {
      variables: {
        chatId: selectedChat.id
      }
    }
  );

  if (chatLoading) {
    return "Loading...";
  }

  if (!chat.messages) {
    chat.messages = [];
  }

  chat.messages = chat.messages.map((message, i) => {
    if (type === "client") {
      message.position = message.from_client ? "right" : "left";
    } else {
      message.position = message.from_client  ? "left" : "right";
    }

    message.time = moment.utc(message.created_at).local().format('HH:mm');
    message.date = moment.utc(message.created_at).local().format('D MMM');

    message.time_block = "";
    message.avatar_block = (
      <div className="avatar empty transparent"></div>
    );

    let timeBlock = (
      <div className="message-time text-light-grey text-sm">
        {message.time}
      </div>
    );

    let avatarBlock = (
      <div className="avatar empty"></div>
    );

    let nextMessage = chat.messages[i + 1];
    let prevMessage = chat.messages[i - 1];

    if (nextMessage) {
      if (nextMessage.from_client !== message.from_client) {
        message.time_block = timeBlock;
      }

      let nextCreatedAt = moment.utc(nextMessage.created_at).local();

      let nextTime = nextCreatedAt.format('HH:mm');
      let nextDate = nextCreatedAt.format('D MMM');

      if (nextTime !== message.time && nextDate === message.date) {
        message.time_block = timeBlock;
      }
    } else {
      message.time_block = timeBlock;
    }

    if (prevMessage) {
      if (prevMessage.time !== message.time && prevMessage.date === message.date) {
        message.time_block = timeBlock;
      }

      if (
        prevMessage.from_client !== message.from_client
        || prevMessage.time !== message.time
        || prevMessage.date !== message.date
      ) {
        message.avatar_block = avatarBlock;
      }
    } else {
      message.avatar_block = avatarBlock;
    }

    return message;
  });

  let messagesByDate = _.groupBy(chat.messages, 'date');

  async function sendMessage() {
    if (!messageText) {
      return;
    }

    await sendMessageMutation({
      variables: {
        input: {
          text: messageText,
          chat_id: selectedChat.id,
        }
      }
    });

    refetchChat();

    setMessageText('');
  }

  return (
    <div className="chat rounded-lg">
      <div className="messages overflow-y-scroll" ref={messagesEndRef}>
        {Object.keys(messagesByDate).map((date) => {
          return <div key={date} className="date-wrap">
            <div className="date-block flex w-full">
              <div className="w-5/12 flex items-center">
                <hr className="w-full"/>
              </div>
              <div className="w-2/12 text-center">
                {date}
              </div>
              <div className="w-5/12 flex items-center">
                <hr className="w-full"/>
              </div>
            </div>
            {messagesByDate[date].map(message => (
              <div
                className={cx(
                  "message",
                  message.position,
                )}
                key={message.id}
              >
                {message.avatar_block}
                <div className="message-text-wrap flex flex-col">
                  <div className="message-text">
                    {message.text}
                  </div>
                  {message.time_block}
                </div>
              </div>
            ))}
          </div>
        })}
      </div>
      <div className="send">
        <img src="/static/img/clip.svg" className="cursor-pointer mr-3" alt=""/>
        <form onSubmit={e => {e.preventDefault();sendMessage()}} className="flex flex-grow">
          <textarea rows="1" name="text" value={messageText} onChange={e => setMessageText(e.target.value)} className="flex-grow outline-none resize-none px-3 py-1"></textarea>

          <a href="#" onClick={e => {e.preventDefault();sendMessage()}} className="text-pink font-bold text-xl ml-3">Send</a>
        </form>
      </div>
    </div>
  );
}


ChatRoom.propTypes = {
  chatId: PropTypes.number,
  type: PropTypes.string,
};

export default ChatRoom;
