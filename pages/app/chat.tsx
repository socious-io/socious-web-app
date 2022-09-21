import MainChat from '@components/common/Chat/MainChat/MainChat';
import SideBar from '@components/common/Chat/SideBar/SideBar';
import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

const Chat = () => {
  const {data, error} = useSWR<any>('/chats/summary?page=1&filter=', get);

  if (!data?.items) <p>Loading....</p>;

  if (!error) <p>Error in fetch</p>;

  const [selectedChat, setSelectedChat] = useState<any>();
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backToChatList = useCallback(() => setSelectedChat(undefined), []);

  return (
    <>
      {width && width >= 640 ? (
        <div className="hidden h-full sm:mt-10 sm:flex sm:space-x-4">
          <SideBar
            onChatOpen={setSelectedChat}
            haveChats={data?.items && data?.items.length > 0}
          />
          <MainChat selectedChat={selectedChat ?? ''} goBack={backToChatList} />
        </div>
      ) : (
        <div className="flex h-full sm:mt-10 sm:hidden sm:space-x-4">
          {!selectedChat ? (
            <SideBar
              onChatOpen={setSelectedChat}
              haveChats={data?.items && data?.items?.length > 0}
            />
          ) : (
            <MainChat
              selectedChat={selectedChat ?? ''}
              goBack={backToChatList}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
