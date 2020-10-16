import React, { useState, useEffect } from "react";
import checkLoggedIn from "lib/checkLoggedIn";
import AccountChat from "components/chat/AccountChat";
import {useRouter} from "next/router";

const Chats = ({ user }) => {
  const {query: {eid, cid, ctype: chatType}} = useRouter();
  const employeeId = eid ? eid.replace('/', '') : eid;
  const chatId = cid ? cid.replace('/', '') : cid;

  return (
    <AccountChat user={user} chatType={chatType} selectedEmployeeId={employeeId} selectedChatId={chatId}/>
  );
};

Chats.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

export default Chats;