import React, { useEffect, useRef, useReducer, useState } from 'react';
import moment from "moment-timezone";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import Link from "next/link";
import { Badge, Slick, Button, MultiPhotoField, MultiVideoField  } from "UI";
import { FavoriteButton } from "components/favorite";
import { MessageSvg, CocktailSvg } from "icons";
import {useQuery, useLazyQuery, useMutation} from "@apollo/react-hooks";
import {CHAT_ROOM, SEND_MESSAGE} from "../../../queries/chatQuery";
import Centrifugo from "components/centrifuge";

function ChatRoom({
  chatId,
  selectedChat,
  refetchChats,
  type = 'client',
}) {
  console.log('++++++++++++++++++++++++++++');

  const [messageText, setMessageText] = useState('');
  // const [attachments, setAttachments] = useState([]);

  const [attachments, setAttachments] = useReducer((attachments, { type, value }) => {
    console.log(attachments, type, value);

    switch (type) {
      case "add":
        return [...attachments, value];
      case "remove":
        return attachments.filter((_, index) => index !== value);
      default:
        return attachments;
    }
  }, []);

  const unsubscribeChat = () => {
    Centrifugo.init().then(centrifuge => {
      centrifuge.unsubscribe('chat:' + selectedChat.id, (data) => console.log('unsubscribe chat ' + selectedChat.id, data));
    });
  };

  useEffect(() => {
    window.addEventListener('unhandledRejection', unsubscribeChat);
    return () => {
      window.removeEventListener('unhandledRejection', unsubscribeChat);
    }
  }, []);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    if (!messagesEndRef || !messagesEndRef.current) {
      return;
    }
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(scrollToBottom);

  let chat = selectedChat;

  let { data: { chat: loadedChat } = selectedChat, loading: chatLoading, refetch: refetchChat } = useQuery(
    CHAT_ROOM,
    {
      variables: {
        chatId: selectedChat.id
      }
    }
  );

  if (chatLoading && !selectedChat) {
    return "Loading...";
  }

  console.log('loadedChat', loadedChat);

  if (loadedChat) {
    chat = loadedChat;
  }

  Centrifugo.init().then(centrifuge => {
    if (centrifuge.getSub('chat:' + selectedChat.id)) {
      return;
    }
    console.log('chat:' + selectedChat.id);
    centrifuge.subscribe('chat:' + selectedChat.id, data => {
      console.log(data);

      if (data.data.action === 'refresh') {
        console.log('refreshing chat');
        refetchChat();
      } else {
        console.log('not need to refresh chat');
      }
    });
  });

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

      if (nextTime !== message.time || nextDate !== message.date) {
        message.time_block = timeBlock;
      }
    } else {
      message.time_block = timeBlock;
    }

    if (prevMessage) {
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

    let sentData = await sendMessageMutation({
      variables: {
        input: {
          text: messageText,
          chat_id: chat.id,
          employee_id: selectedChat.receiver.id,
        }
      }
    });

    if (!chat.id) {
      chat.id = sentData.data.sendMessage.chat_id;
      selectedChat.id = sentData.data.sendMessage.chat_id;
      refetchChats();
      // setSelectedChat(selectedChat);
      // refetchChat();
      // updateChat(chat);
    }

    console.log(sentData);

    setMessageText('');
  }

  function handleAttachments(event) {
    // let attachmentsList = [];

    for (let i in event.target.files) {
      if (event.target.files[i] instanceof File) {
        // attachmentsList.push(URL.createObjectURL(event.target.files[i]));

        setAttachments({type: 'add', value: URL.createObjectURL(event.target.files[i])});
      }
    }

    // setAttachments(attachmentsList);
  }

  function simulateFileInputClick() {
    fileInputRef.current.click()
  }

  function sendMessageEventHandler(e) {
    e.preventDefault();
    sendMessage();
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
        {attachments.map(attachment => {
          <img src={attachment} width={100} height={100}/>
        })}
      </div>
      <div className="send">
        <img src="/static/img/clip.svg" className="cursor-pointer mr-3" alt="" onClick={simulateFileInputClick} />
        <form onSubmit={e => {e.preventDefault();sendMessage()}} className="flex flex-grow">
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleAttachments}/>
          <textarea rows="1" name="text" value={messageText} onChange={e => setMessageText(e.target.value)} className="flex-grow outline-none resize-none px-3 py-1"></textarea>

          <a href="#" onClick={sendMessageEventHandler} className="text-pink font-bold text-xl ml-3">Send</a>
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
