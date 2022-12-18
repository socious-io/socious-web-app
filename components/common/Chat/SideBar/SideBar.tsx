import SearchBar from '@components/common/SearchBar/SearchBar';
import {PlusIcon} from '@heroicons/react/24/outline';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ChatCard from '../ChatCard/ChatCard';
import {useUser} from '@hooks';
import {twMerge} from 'tailwind-merge';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {ChatSummaryChat} from '@models/chat';

type ChatSideBarProps = {
  onChatOpen?: (data: any) => void;
  page: 'index' | 'show';
  toggleAddChat: () => void;
};

const SideBarToBe = (
  {onChatOpen, page, toggleAddChat}: ChatSideBarProps,
  ref: any,
) => {
  const [query, setQuery] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);

  const {currentIdentity} = useUser();

  const {
    flattenData: chats,
    infiniteError: chatsError,
    mutateInfinite: mutateChats,
    seeMore,
    loadMore,
    isLoading,
  } = useInfiniteSWR<ChatSummaryChat>(`/chats/summary?filter=${query}`);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      mutateChats();
    },
  }));

  // Mutate SideBar everytime user changes between a/c.
  useEffect(() => {
    if (currentIdentity) mutateChats();
  }, [currentIdentity, mutateChats]);

  const onScroll = useCallback(() => {
    if (!(chatListRef?.current && seeMore)) return;
    const {scrollTop, scrollHeight, clientHeight} = chatListRef.current;
    if (Math.floor(scrollTop) >= scrollHeight - clientHeight - 80) {
      loadMore();
    }
  }, [loadMore, seeMore]);

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
      <div className="mt-14 flex items-center justify-center pb-3.5 sm:mt-7 sm:justify-center">
        <h3 className="font-worksans text-center text-xl font-semibold">
          Chats
        </h3>
      </div>
      {/* SEARCHBAR */}
      <div className="border-y-[0.5px] border-offsetColor bg-offWhite px-4 py-2.5 ">
        <SearchBar
          placeholder="Search name"
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      {/* USER-CARD BOX */}
      {query || (!query && chats?.length > 0) ? (
        chats?.length > 0 ? (
          <div
            className="grow overflow-y-auto sm:w-80"
            ref={chatListRef}
            onScroll={onScroll}
          >
            {/* USER-CARD */}
            {chats?.map((chat: any) => (
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
              {isLoading ? (
                <h2>Loading…</h2>
              ) : (
                <>
                  <h2>Sorry, no chat found.</h2>{' '}
                  <p className="text-grayInputField">
                    Maybe you want start a new chat.
                  </p>
                </>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="mb-10 flex w-full grow items-center justify-center bg-background sm:hidden">
          {/* NO PARTICIPANT BOX */}
          <div className="font-worksans max-w-[32rem] text-center text-grayInputField">
            <h2>Message your friends</h2>{' '}
            <p>
              Let&apos;s make a great conversation with your trustworthy
              friends, partners
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const SideBar = forwardRef(SideBarToBe);
