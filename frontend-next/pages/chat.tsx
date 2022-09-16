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
import {useEffect, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

const Chat = () => {
  const {data, error} = useSWR<any>('/chats', get);
  console.log('Chats --- ', data);

  if (!data.items) <p>Loading....</p>;

  if (!error) <p>Error in fetch</p>;
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>();

  useEffect(() => setChats(data?.items), [data]);

  return (
    <div className="flex sm:mt-10 sm:space-x-4 h-full">
      {/* SIDEBAR */}
      <SideBar chats={chats} />
      {/* CHAT BOX */}
      <MainChat selectedChat={selectedChat ?? ''} />
    </div>
  );
};

export default Chat;
