import React, { useState, useEffect } from "react";
import checkLoggedIn from "lib/checkLoggedIn";
import {useRouter} from "next/router";
import { getLayout } from "components/account/AccountLayout";
import {MY_CHATS, MY_ADMIN_CHATS} from 'queries';
import {useQuery} from "@apollo/react-hooks";
import {Loader, Button} from 'UI';
import {useTranslation} from "react-i18next";
import cx from 'classnames';
import moment from "moment-timezone";
import Link from 'components/SlashedLink'
import {GET_ME} from "queries/userQuery";

const ChatCard = ({chat, type}) => {
  const {t, i18n} = useTranslation();

  const checkHasTranslation = key => t(key) !== key;
  const date = moment.utc(chat.last_message.created_at).local().fromNow();

  let fromField;
  let firstAvatar;
  let secondAvatar;

  if (type === 'simple') {
    fromField = 'from_client';
    firstAvatar = chat.client.avatar ? chat.client.avatar.url : null;
    secondAvatar = chat.employee.avatar ? chat.employee.avatar.url : null;
  } else if (type === 'admin') {
    fromField = 'from_admin';
    firstAvatar = null;
    if (chat.user.fucking_avatar) {
      secondAvatar = chat.user.fucking_avatar.url;
    } else if (chat.user.avatar) {
      secondAvatar = chat.user.avatar.url;
    }
  }

  return (
    <div className="w-full flex flex-col pt-4 mb-5">
      <div className="w-full flex justify-between items-center mb-4 scale">
        <div className={cx([
          "flex",
          chat.last_message[fromField] ? "" : "flex-row-reverse"
        ])}>
          <div className="mr-4 flex items-center">
            <div className="mr-2">
              {firstAvatar ? (
                <img className="rounded-full"
                   style={{
                     width: '40px',
                     height: '40px',
                     backgroundColor: '#dfdfdf',
                   }}
                   src={firstAvatar}
                />
              ) : (
                <div className="bg-grey rounded-full" style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#dfdfdf'
                }}/>
              )}
            </div>

            <div>
              {type === 'simple' &&
                <>
                  <span className="text-grey capitalize">{t('common.client')},</span>&nbsp;
                </>
              }
              <span className="font-bold">{type === 'simple' ? chat.client.name : 'Administrator'}</span>
            </div>
          </div>
          <div className="mr-4 flex items-center">
            <div className="mr-2">
              {secondAvatar ? (
                <img className="rounded-full"
                  style={{
                   width: '40px',
                   height: '40px',
                   backgroundColor: '#dfdfdf',
                  }}
                  src={secondAvatar}
                />
              ) : (
                <div className="bg-grey rounded-full" style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#dfdfdf'
                }}/>
              )}
            </div>

            <div>
              {type === 'simple' &&
                <>
                  <span className="text-grey capitalize">
                    {chat.last_message[fromField] ? t('common.to') : t('common.from')},
                  </span>&nbsp;
                </>
              }
              <span className="font-bold">{type === 'simple' ? chat.employee.name : chat.user.name}</span>
            </div>
          </div>
        </div>
        <div className="text-grey text-sm">{t('common.type')}: {t('common.chat')}</div>
      </div>

      <div className="w-full bg-xs-grey rounded-b rounded-tr p-5 relative scale">
        <div className="absolute bg-xs-grey" style={{
          width: '18px',
          height: '18px',
          transform: 'rotate(45deg)',
          left: '42px',
          top: '-9px'
        }} />
        <div>
          {checkHasTranslation(chat.last_message.text) ?
            <span className="font-bold">
              {t(chat.last_message.text)}
            </span>
            :
            <span>
              {chat.last_message.text}
            </span>
          }

        </div>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex items-center">
            <Link
              as={`/account/messages-and-chats/chat`}
              href={`/account/messages-and-chats/chat?ctype=${type}&cid=${chat.id}&eid=${type === 'simple' ? chat.employee.id : ''}`}
            >
              <a>
                <Button
                  className="px-3 mr-3"
                  level="primary-black"
                  outline
                  size="xs"
                  type="button"
                >
                  <div className="flex items-center">
                    {t('common.answer')}
                  </div>
                </Button>
              </a>
            </Link>

            {type === 'simple' &&
              <>
                <span className="text-sm text-light-grey mr-3 cursor-pointer">{t('common.ignore')}</span>
                <span className="text-sm text-red cursor-pointer">{t('common.report_abuse')}</span>
              </>
            }
          </div>
          <div className="text-grey">{date}</div>
        </div>
      </div>
    </div>
  );
};

const Chats = ({ user }) => {
  const {t} = useTranslation();
  const {data: {myChats} = {}, loading} = useQuery(MY_CHATS);
  const {data: {myAdminChats} = {}, loading: loadingAdminChats} = useQuery(MY_ADMIN_CHATS);

  if (loading || loadingAdminChats) {
    return <Loader/>
  }

  return (
    <div className="">
      <h2 className="text-2xl font-medium tracking-tighter leading-none mb-5 scale">
        {t('chat.header')}
      </h2>

      {myAdminChats.map(chat => (
        <ChatCard chat={chat} type="admin" key={chat.id}/>
      ))}

      {myChats.map(chat => (
        <ChatCard chat={chat} type="simple" key={chat.id}/>
      ))}
    </div>
  );
};

Chats.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

Chats.getLayout = getLayout;

export default Chats;
