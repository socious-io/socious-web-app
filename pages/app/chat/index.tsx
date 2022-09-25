import ChatLayout from '@components/common/Chat/ChatLayout/ChatLayout';
import MainChat from '@components/common/Chat/MainChat/MainChat';
import {SideBar} from '@components/common/Chat/SideBar/SideBar';
import {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

const Chat = () => {
  // const {data, error} = useSWR<any>('/chats/summary?page=1&filter=', get);
  // const sideBarRefresh = useRef<any>(null);

  // if (!data?.items) <p>Loading....</p>;

  // if (!error) <p>Error in fetch</p>;

  // const [selectedChat, setSelectedChat] = useState<any>();
  // const [width, setWidth] = useState<number>();

  // useEffect(() => {
  //   setWidth(window.innerWidth);
  //   const handleResize = () => setWidth(window.innerWidth);

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const backToChatList = useCallback(() => setSelectedChat(undefined), []);

  return (
    <>
      {/* {width && width >= 640 ? (
        <div className="hidden h-full sm:mt-10 sm:flex sm:space-x-4">
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
        <div className="flex h-full sm:mt-10 sm:hidden sm:space-x-4">
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
      )} */}
      {/* <MainChat
        selectedChat={selectedChat ?? ''}
        goBack={backToChatList}
        refreshSideBar={sideBarRefresh?.current?.refresh}
      /> */}
      <ChatLayout page="index">
        {() => (
          <div className="mb-10 hidden h-[48rem] w-full items-center justify-center rounded-2xl border border-grayLineBased bg-background sm:flex sm:min-h-full">
            {/* NO PARTICIPANT BOX */}
            <div className="font-worksans max-w-[32rem] text-center text-grayInputField">
              <h2>Message your friends</h2>{' '}
              <p>
                Let’s make a great conversation with your trustworthy friends,
                partners
              </p>
            </div>
          </div>
        )}
      </ChatLayout>
    </>
  );
};

// Chat.getLayout = function getLayout(page: ReactElement) {
//   return <ChatLayout>{page}</ChatLayout>;
// };

export default Chat;
