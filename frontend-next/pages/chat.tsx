import {Avatar, SearchBar} from '@components/common';
import Bubble from '@components/common/Chat/Bubble/Bubble';
import MainChat from '@components/common/Chat/MainChat/MainChat';
import SideBar from '@components/common/Chat/SideBar/SideBar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

const Chat = () => {
  const {data, error} = useSWR<any>('/chats/summary', get);

  if (!data?.items) <p>Loading....</p>;

  if (!error) <p>Error in fetch</p>;

  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>();
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => setChats(data?.items), [data]);

  const backToChatList = useCallback(() => setSelectedChat(''), []);

  return (
    <>
      {width && width >= 640 ? (
        <div className="hidden sm:flex sm:mt-10 sm:space-x-4 h-full">
          <SideBar chats={chats} onChatOpen={setSelectedChat} />
          <MainChat selectedChat={selectedChat ?? ''} goBack={backToChatList} />
        </div>
      ) : (
        <div className="flex sm:hidden sm:mt-10 sm:space-x-4 h-full">
          {!selectedChat ? (
            <SideBar chats={chats} onChatOpen={setSelectedChat} />
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
