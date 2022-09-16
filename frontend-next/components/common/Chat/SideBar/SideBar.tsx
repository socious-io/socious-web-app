import Avatar from '@components/common/Avatar/Avatar';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {ChevronLeftIcon, PlusIcon} from '@heroicons/react/outline';
import React from 'react';

type ChatSideBarProps = {
  chats: any[];
};

const SideBar = ({chats}: ChatSideBarProps) => {
  return (
    <div
      className="w-full h-screen sm:w-80 sm:border border-grayLineBased bg-background sm:h-[45rem] rounded-2xl relative"
      aria-label="Sidebar"
    >
      {/* ADD PARTICIPANT BUTTON */}
      <div className="absolute bottom-10 right-4 p-3 bg-primary inline-block rounded-full">
        <PlusIcon className="w-6 text-white" />
      </div>

      <div>
        {/* HEADER */}
        <div className="flex justify-between sm:justify-center items-center mt-14 sm:mt-7 pb-3.5 pr-3 pl-6">
          <span className="block sm:hidden" onClick={() => console.log('back')}>
            <ChevronLeftIcon className="w-5" />
          </span>
          <h3 className="font-semibold text-xl text-center font-worksans">
            Chats
          </h3>
          <Avatar size="m" src="" className="block sm:hidden" />
        </div>
        {/* SEARCHBAR */}
        <div className="px-4 py-2.5 bg-offWhite border-offsetColor border-y-[0.5px] ">
          <SearchBar placeholder="Search name" />
        </div>
        {/* USER-CARD BOX */}
        {chats?.length !== 0 ? (
          <div className="overflow-y-auto hide-scrollbar">
            {/* USER-CARD */}
            {chats?.map((chat: any) => (
              <div
                key={chat?.id}
                className="font-normal flex items-center space-x-2 py-2.5 px-3 border-offsetColor border-b-[1px]"
              >
                <Avatar size="l" src="" />
                <div className="grow">
                  <p className="text-base">{chat?.name}</p>
                  <p className="text-graySubtitle text-sm">Message</p>
                </div>
                <div>
                  <p className="text-grayInputField text-sm mx-auto">Time</p>
                  <div className="mx-auto mt-2 rounded-full bg-primary text-white font-semibold w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    <span className="text-xs">1</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full sm:hidden flex items-center justify-center mb-10 h-[45rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
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
    </div>
  );
};

export default SideBar;
