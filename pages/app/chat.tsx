import MainChat from '@components/common/Chat/MainChat/MainChat';
import {SideBar} from '@components/common/Chat/SideBar/SideBar';
import {useCallback, useEffect, useRef, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import {GeneralLayout} from 'layout';
const Chat = () => {
  const {data, error} = useSWR<any>('/chats/summary?page=1&filter=', get);
  const sideBarRefresh = useRef<any>(null);

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
    <GeneralLayout>
      {width && width >= 640 ? (
        <div className="hidden h-full w-full sm:flex sm:space-x-4">
          <SideBar
            ref={sideBarRefresh}
            onChatOpen={setSelectedChat}
            haveChats={data?.items && data?.items.length > 0}
          />
          <MainChat
            selectedChat={selectedChat ?? ''}
            goBack={backToChatList}
            refreshSideBar={sideBarRefresh?.current?.refresh}
          />
        </div>
      ) : (
        <div className="flex h-full sm:hidden">
          {!selectedChat ? (
            <SideBar
              ref={sideBarRefresh}
              onChatOpen={setSelectedChat}
              haveChats={data?.items && data?.items?.length > 0}
            />
          ) : (
            <MainChat
              selectedChat={selectedChat ?? ''}
              goBack={backToChatList}
              refreshSideBar={sideBarRefresh?.current?.refresh}
            />
          )}
        </div>
      )}
    </GeneralLayout>
  );
};

export default Chat;
