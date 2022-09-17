import Avatar from '@components/common/Avatar/Avatar';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {ChevronLeftIcon, PlusIcon} from '@heroicons/react/outline';
import React, {useCallback, useEffect, useState} from 'react';
import ChatCard from '../ChatCard/ChatCard';
import {useRouter} from 'next/router';

type ChatSideBarProps = {
  chats: any[];
  onChatOpen: (data: any) => void;
};

const SideBar = ({chats, onChatOpen}: ChatSideBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [filteredChats, setFilteredChats] = useState<any[]>([]);

  const goBack = useCallback(() => router.back(), [router]);

  useEffect(() => {
    query === ''
      ? setFilteredChats(chats)
      : setFilteredChats(() =>
          chats.filter((person) =>
            person.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          ),
        );
  }, [query, chats]);

  return (
    <div
      className="flex flex-col w-full h-screen min-w-80 sm:w-80 sm:border border-grayLineBased bg-background sm:h-[48rem] rounded-2xl relative"
      aria-label="Sidebar"
    >
      {/* ADD PARTICIPANT BUTTON */}
      <div className="absolute bottom-10 right-4 p-3 bg-primary inline-block rounded-full">
        <PlusIcon className="w-6 text-white" />
      </div>

      {/* HEADER */}
      <div className="flex justify-between sm:justify-center items-center mt-14 sm:mt-7 pb-3.5 pr-3 pl-6">
        <span className="block sm:hidden" onClick={goBack}>
          <ChevronLeftIcon className="w-5" />
        </span>
        <h3 className="font-semibold text-xl text-center font-worksans">
          Chats
        </h3>
        <Avatar size="m" src="" className="block sm:hidden" />
      </div>
      {/* SEARCHBAR */}
      <div className="px-4 py-2.5 bg-offWhite border-offsetColor border-y-[0.5px] ">
        <SearchBar
          placeholder="Search name"
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      {/* USER-CARD BOX */}
      {chats?.length !== 0 ? (
        filteredChats?.length > 0 ? (
          <div className="overflow-y-auto grow sm:w-80 hide-scrollbar">
            {/* USER-CARD */}
            {filteredChats?.map((chat: any) => (
              <ChatCard key={chat.id} chat={chat} onChatOpen={onChatOpen} />
            ))}
          </div>
        ) : (
          <div className="w-full  sm:w-80 flex items-center justify-center grow mb-10 h-auto bg-background sm:min-h-full">
            {/* SEARCH NOT FOUND */}
            <div className="font-worksans max-w-[32rem] text-center">
              <h2>Sorry, no chat found.</h2>{' '}
              <p className="text-grayInputField">
                Maybe, you want start a new chat.
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="w-full sm:hidden grow flex items-center justify-center mb-10 grow bg-background">
          {/* NO PARTICIPANT BOX */}
          <div className="text-center font-worksans text-grayInputField max-w-[32rem]">
            <h2>Message your friends</h2>{' '}
            <p>
              Let’s make a great conversation with your trustworthy friends,
              partners
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
