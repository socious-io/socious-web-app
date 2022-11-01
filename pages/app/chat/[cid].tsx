import ChatLayout from '@components/common/Chat/ChatLayout/ChatLayout';
import MainChat from '@components/common/Chat/MainChat/MainChat';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {get} from 'utils/request';
import {GeneralLayout} from 'layout';
import {IChat} from '@models/chat';

const Chat = () => {
  const router = useRouter();
  const {cid} = router.query;

  const {data: chat, error: chatError} = useSWR<IChat>(
    cid ? `/chats/${cid}` : null,
    get,
    {
      shouldRetryOnError: false,
    },
  );

  if (
    chatError &&
    ['"value" must be a valid GUID', 'Not matched'].includes(
      chatError?.response?.data?.error,
    )
  )
    router.push('/app/chat');

  if ((!chat && !chatError) || !chat) return <p>Loading!!!</p>;

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
