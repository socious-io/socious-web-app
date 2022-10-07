import React from 'react';
import ChatLayout from '@components/common/Chat/ChatLayout/ChatLayout';
import MainChat from '@components/common/Chat/MainChat/MainChat';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {get} from 'utils/request';
import {GeneralLayout} from 'layout';

const Chat = () => {
  const router = useRouter();
  const {cid} = router.query;

  const {data: chat, error: chatError} = useSWR<any>(
    cid ? `/chats/${cid}` : null,
    get,
    {
      shouldRetryOnError: false,
    },
  );

  if (!chat && !chatError) return <p>Loading!!!</p>;
  if (
    chatError &&
    ['"value" must be a valid GUID', 'Not matched'].includes(
      chatError?.response?.data?.error,
    )
  )
    router.push('/app/chat');

  return (
    <GeneralLayout>
      <ChatLayout page="show">
        {(refreshSideBar) => (
          <MainChat activeChat={chat} refreshSideBar={refreshSideBar} />
        )}
      </ChatLayout>
    </GeneralLayout>
  );
};

export default Chat;
