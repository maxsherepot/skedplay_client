import React, { useEffect, useRef, useReducer, useState } from 'react';
import moment from "moment-timezone";
import PropTypes from "prop-types";
import cx from "classnames";
import {groupBy} from "lodash";
import {  Loader  } from "UI";
import {useQuery, useLazyQuery, useMutation} from "@apollo/react-hooks";
import {CHAT_ROOM, ADMIN_CHAT_ROOM, SEND_MESSAGE, SEND_ADMIN_MESSAGE} from "queries";
import Centrifugo from "components/centrifuge";
import { WhiteTrashSvg } from "icons";
import {useTranslation} from "react-i18next";

function ChatRoom({
  user,
  chatId,
  selectedChat,
  selectedChatType = 'simple',
  refetchChats,
  type = 'client',
}) {
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const {t, i18n} = useTranslation();

  const checkHasTranslation = key => t(key) !== key;

  const scrollToBottom = () => {
    if (!messagesEndRef || !messagesEndRef.current) {
      return;
    }
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  const chatChannel = selectedChatType === 'simple'
    ? 'chat:' + selectedChat.id
    : 'admin_chat:' + selectedChat.id;

  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState('');

  const [attachments, setAttachments] = useReducer((currentAttachments, { type, value }) => {

    switch (type) {
      case "merge":
        setTimeout(scrollToBottom, 100);
        return [...currentAttachments, ...value];
      case "add":
        setTimeout(scrollToBottom, 100);
        return [...currentAttachments, value];
      case "remove":
        const dt = new DataTransfer();
        for (let i = 0; i < fileInputRef.current.files.length; i++) {
          if (i === value || !(fileInputRef.current.files[i] instanceof File)) {
            continue;
          }
          dt.items.add(fileInputRef.current.files[i])
        }

        fileInputRef.current.files = dt.files;

        return currentAttachments.filter((a, i) => i !== value);
      case "clear":
        return [];
      default:
        return currentAttachments;
    }
  }, []);

  const unsubscribeChat = () => {
    Centrifugo.init().then(centrifuge => {
      centrifuge.unsubscribe(
        chatChannel,
        (data) => console.log('unsubscribe chat ' + chatChannel, data)
      );
    });
  };

  useEffect(() => {
    window.addEventListener('unhandledRejection', unsubscribeChat);
    return () => {
      window.removeEventListener('unhandledRejection', unsubscribeChat);
    }
  }, []);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [sendAdminMessageMutation] = useMutation(SEND_ADMIN_MESSAGE);

  useEffect(scrollToBottom);

  let chat = selectedChat;

  let { data, loading: chatLoading, refetch: refetchChat, client } = useQuery(
    selectedChatType === 'simple' ? CHAT_ROOM : ADMIN_CHAT_ROOM,
    {
      fetchPolicy: 'no-cache',
      variables: {
        chatId: selectedChat.id
      }
    }
  );

  if (chatLoading) {
    return <Loader/>;
  }

  let loadedChat = data
    ? data.chat || data.adminChat
    : selectedChat;

  if (loadedChat) {
    chat = loadedChat;
  }

  Centrifugo.init().then(centrifuge => {
    if (centrifuge && centrifuge.getSub(chatChannel)) {
      return;
    }

    centrifuge && centrifuge.subscribe(chatChannel, data => {
      if (data.data.action === 'refresh') {
        refetchChat();
      } else if (data.data.action === 'add') {
        chat.messages.push(data.data.message);
        client.writeData({ data: { chat: {messages: chat.messages} } });
      }
    });
  });

  if (!chat.messages) {
    chat.messages = [];
  }

  chat.messages = chat.messages.map((message, i) => {
    const fromField = selectedChatType === 'simple'
      ? 'from_client'
      : 'from_admin';

    let avatar;

    if (selectedChatType === 'simple') {
      if (message[fromField]) {
        avatar = chat.client_avatar;
      } else {
        avatar = chat.employee_avatar;
      }
    } else {
      if (!message[fromField]) {
        avatar = chat.user_avatar;
      }
    }

    if (selectedChatType === 'simple') {
      if (type === "client") {
        message.position = message[fromField] ? "right" : "left";
      } else {
        message.position = message[fromField]  ? "left" : "right";
      }
    } else {
      if (user.is_admin) {
        message.position = message[fromField] ? "right" : "left";
      } else {
        message.position = message[fromField] ? "left" : "right";
      }
    }

    message.time = moment.utc(message.created_at).local().format('HH:mm');
    message.date = moment.utc(message.created_at).local().format('D MMM');

    message.time_block = "";

    let timeBlock = (
      <div className="message-time text-light-grey text-sm">
        {message.time}
      </div>
    );

    let avatarBlock = !avatar ?
      <div className="avatar empty"/>
      :
      <img className="avatar" src={avatar.url} />;

    let nextMessage = chat.messages[i + 1];
    let prevMessage = chat.messages[i - 1];

    if (nextMessage) {
      if (nextMessage[fromField] !== message[fromField]) {
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
        prevMessage[fromField] !== message[fromField]
        || prevMessage.time !== message.time
        || prevMessage.date !== message.date
      ) {
        message.avatar_block = avatarBlock;
      }
    } else {
      message.avatar_block = avatarBlock;
    }

    if (checkHasTranslation(message.text) && typeof message.text !== 'object') {
      message.text = (
        <span className="font-bold">{t(message.text)}</span>
      );
    }

    return message;
  });

  let messagesByDate = groupBy(chat.messages, 'date');

  async function sendMessage() {
    if (sending || (!messageText && fileInputRef.current.files.length === 0)) {
      return;
    }

    setSending(true);

    let sentData

    if (selectedChatType === 'simple') {
      sentData = await sendMessageMutation({
        variables: {
          input: {
            text: messageText,
            chat_id: chat.id,
            client_id: selectedChat.client_id,
            employee_id: selectedChat.employee_id,
            attachments: fileInputRef.current.files,
          }
        }
      });
    } else {
      sentData = await sendAdminMessageMutation({
        variables: {
          input: {
            text: messageText,
            chat_id: chat.id,
            // user_id: chat.user_id,
            attachments: fileInputRef.current.files,
          }
        }
      });
    }

    if (!chat.id) {
      chat.id = sentData.data.sendMessage.chat_id;
      selectedChat.id = sentData.data.sendMessage.chat_id;
      refetchChats();
    }

    setMessageText('');
    setAttachments({type: 'clear'});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setSending(false);
  }

  function handleAttachments(event) {
    let attachmentsList = [];

    for (let i in event.target.files) {
      if (event.target.files[i] instanceof File) {
        attachmentsList.push(URL.createObjectURL(event.target.files[i]));
      }
    }

    setAttachments({type: 'merge', value: attachmentsList});
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
                <div
                  className="message-text-wrap flex flex-col"
                  style={{
                    marginTop: !message.text || !message.text.length ? "-10px" : "0",
                  }}
                >
                  {
                    message.text &&
                    <div className={cx(
                      "flex",
                      message.position === 'left' ? "" : "justify-end",
                    )}>
                      <div className="message-text">
                        {message.text}
                      </div>
                    </div>
                  }
                  <div className="message-attachments flex flex-wrap">
                    {message.attachments.map(attachment => {
                      return (
                        <div className="attachment" key={attachment.id}>
                          <img src={attachment.url} className="rounded-lg"/>
                        </div>
                      );
                    })}
                  </div>
                  {message.time_block}
                </div>
              </div>
            ))}
          </div>
        })}
        <div className="attachments flex-wrap">
          {attachments.map((attachment, i) => {
            return (
              <div className="attachment relative" key={i}>
                <img src={attachment} className="rounded-lg"/>

                <div className="absolute top-0 right-0 z-40 cursor-pointer">
                  <div
                    className="flex items-center justify-center w-6 h-6 bg-red rounded-bl-lg rounded-tr-lg"
                    onClick={() => setAttachments({type: 'remove', value: i})}
                  >
                    <WhiteTrashSvg />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="send">
        <img src="/static/img/clip.svg" className="cursor-pointer mr-3" alt="" onClick={simulateFileInputClick} />
        <form onSubmit={e => {e.preventDefault();sendMessage()}} className="flex flex-grow">
          <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachments}
            accept="image/jpeg,image/jpg,image/png"
          />
          <textarea
            rows="1"
            name="text"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            className="flex-grow outline-none resize-none px-3 py-1"
            onKeyPress={e => {e.key === 'Enter' && sendMessageEventHandler(e)}}
          />

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
