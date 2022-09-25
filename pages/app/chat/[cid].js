import React from 'react';
import ChatLayout from '@components/common/Chat/ChatLayout/ChatLayout';
import MainChat from '@components/common/Chat/MainChat/MainChat';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {get} from 'utils/request';

const Chat = () => {
  const router = useRouter();
  const {cid} = router.query;

  console.log('cid :---: ', cid);
  const {data: chat, error: chatError} = useSWR(
    cid ? `/chats/${cid}` : null,
    get,
    {
      shouldRetryOnError: false,
    },
  );

  if (!chat && !chatError) return <p>Loading!!!</p>;
  if (
    chatError &&
    chatError?.response?.data?.error == '"value" must be a valid GUID'
  )
    router.push('/app/chat');

  if (chat && chatError) return <p>Loading...</p>;
  return (
    <ChatLayout page="show">
      {(refreshSideBar) => (
        <MainChat activeChat={chat} refreshSideBar={refreshSideBar} />
      )}
    </ChatLayout>
  );
};

export default Chat;
