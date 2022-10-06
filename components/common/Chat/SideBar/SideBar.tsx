import Avatar from '@components/common/Avatar/Avatar';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {ChevronLeftIcon, PlusIcon} from '@heroicons/react/24/outline';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import ChatCard from '../ChatCard/ChatCard';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {get} from 'utils/request';
import {useUser} from '@hooks';
import {twMerge} from 'tailwind-merge';
import {useRef} from 'react';

type ChatSideBarProps = {
  onChatOpen?: (data: any) => void;
  page: 'index' | 'show';
  toggleAddChat: () => void;
};

const SideBarToBe = (
  {onChatOpen, page, toggleAddChat}: ChatSideBarProps,
  ref: any,
) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [filteredChats, setFilteredChats] = useState<any[]>([]);

  const goBack = useCallback(() => router.back(), [router]);
  const {user, currentIdentity} = useUser();

  const {
    data: chatResponse,
    error: chatError,
    mutate: mutateChats,
  } = useSWR<any>(`/chats/summary?page=1&filter=${query}`, get);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      mutateChats();
    },
  }));

  // Mutate SideBar everytime user changes between a/c.
  useEffect(() => {
    if (currentIdentity) mutateChats();
  }, [currentIdentity, mutateChats]);

  useEffect(() => {
    if (chatResponse?.items) setFilteredChats(chatResponse.items);
  }, [chatResponse]);

  return (
    <div
      className={twMerge(
        'min-w-80 relative h-screen w-full flex-col rounded-2xl border-grayLineBased bg-background sm:h-[48rem] sm:w-80 sm:border',
        page === 'show' ? 'hidden sm:flex' : 'flex',
      )}
      aria-label="Sidebar"
    >
      {/* ADD PARTICIPANT BUTTON */}
      <div
        className="absolute bottom-10 right-4 inline-block rounded-full bg-primary p-3"
        onClick={toggleAddChat}
      >
        <PlusIcon className="w-6 text-white" />
      </div>

      {/* HEADER */}
      <div className="mt-14 flex items-center justify-between pb-3.5 pr-3 pl-6 sm:mt-7 sm:justify-center">
        <span className="block sm:hidden" onClick={goBack}>
          <ChevronLeftIcon className="w-5" />
        </span>
        <h3 className="font-worksans text-center text-xl font-semibold">
          Chats
        </h3>
        <Avatar
          size="m"
          type={currentIdentity?.type === 'users' ? 0 : 1}
          src={
            currentIdentity?.type === 'users'
              ? user?.avatar?.url
              : user?.image?.url
          }
          type={currentIdentity?.type}
          className="block sm:hidden"
        />
      </div>
      {/* SEARCHBAR */}
      <div className="border-y-[0.5px] border-offsetColor bg-offWhite px-4 py-2.5 ">
        <SearchBar
          placeholder="Search name"
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      {/* USER-CARD BOX */}
      {query || (!query && chatResponse?.items?.length > 0) ? (
        filteredChats?.length > 0 ? (
          <div className="hide-scrollbar grow overflow-y-auto sm:w-80">
            {/* USER-CARD */}
            {filteredChats?.map((chat: any) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                onChatOpen={(text) => onChatOpen && onChatOpen(text)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-auto w-full grow items-center justify-center bg-background px-4 sm:w-80">
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
        <div className="mb-10 flex w-full grow grow items-center justify-center bg-background sm:hidden">
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
    </div>
  );
};

export const SideBar = forwardRef(SideBarToBe);
