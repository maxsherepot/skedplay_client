import React, { useState, useEffect } from "react";
import checkLoggedIn from "lib/checkLoggedIn";
import {useRouter} from "next/router";
import { getLayout } from "components/account/AccountLayout";
import {MY_CHATS} from 'queries';
import {useQuery} from "@apollo/react-hooks";
import {Loader, Button} from 'UI';
import {useTranslation} from "react-i18next";
import cx from 'classnames';
import moment from "moment-timezone";
import Link from "next/link";

const ChatCard = ({chat}) => {
  const {t, i18n} = useTranslation();

  const checkHasTranslation = key => t(key) !== key;

  const date = moment.utc(chat.last_message.created_at).local().fromNow();

  return (
    <div className="w-full flex flex-col pt-4 mb-5">
      <div className="w-full flex justify-between items-center mb-4">
        <div className={cx([
          "flex",
          chat.last_message.from_client ? "" : "flex-row-reverse"
        ])}>
          <div className="mr-4 flex items-center">
            <div className="mr-2">
              <div className="bg-grey rounded-full" style={{
                width: '40px',
                height: '40px',
              }}/>
            </div>

            <div>
              <span className="text-grey capitalize">{t('common.client')},</span>&nbsp;
              <span className="font-bold">{chat.client.name}</span>
            </div>
          </div>
          <div className="mr-4 flex items-center">
            <div className="mr-2">
              <div className="bg-grey rounded-full" style={{
                width: '40px',
                height: '40px',
              }}/>
            </div>

            <div>
              <span className="text-grey capitalize">
                {chat.last_message.from_client ? t('common.to') : t('common.from')},
              </span>&nbsp;
              <span className="font-bold">{chat.employee.name}</span>
            </div>
          </div>
        </div>
        <div className="text-grey text-sm">{t('common.type')}: {t('common.chat')}</div>
      </div>

      <div className="w-full bg-xs-grey rounded-b rounded-tr p-5 relative">
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
            <Link as={`/account/messages-and-chats/chat`} href={`/account/messages-and-chats/chat?cid=${chat.id}&eid=${chat.employee.id}`}>
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

            <span className="text-sm text-light-grey mr-3 cursor-pointer">{t('common.ignore')}</span>
            <span className="text-sm text-red cursor-pointer">{t('common.report_abuse')}</span>
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

  if (loading) {
    return <Loader/>
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold tracking-tighter leading-none mb-5">
        {t('chat.header')}
      </h2>

      {myChats.map(chat => (
        <ChatCard chat={chat} key={chat.id}/>
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