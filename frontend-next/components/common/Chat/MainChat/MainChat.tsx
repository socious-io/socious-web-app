import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {ChevronLeftIcon, DotsHorizontalIcon} from '@heroicons/react/outline';
import React from 'react';
import Bubble from '../Bubble/Bubble';

type MainChatProps = {
  selectedChat: string;
};

const MainChat = ({selectedChat}: MainChatProps) => {
  return (
    <>
      {selectedChat ? (
        <div className="h-screen hidden sm:flex flex-col w-full mb-10 sm:h-[45rem] sm:border border-grayLineBased bg-background sm:min-h-full sm:rounded-2xl">
          <div className="flex items-center space-x-2 pt-12 px-4 sm:pt-6 pb-2.5 border-offsetcolor border-b-[1px]">
            <span className="block sm:hidden">
              <ChevronLeftIcon className="w-5" />
            </span>
            <Avatar size="l" src="" />
            <div className="grow">
              <p className="text-base cursor-pointer">Name</p>
              <p className="text-graySubtitle text-sm">Last Online</p>
            </div>
            <DotsHorizontalIcon className="w-7 p-1 rounded-full" />
          </div>
          <div className="grow overflow-y-auto w-full p-4 space-y-2">
            <Bubble />
            <Bubble self={false} link="https://www.google.com" />
          </div>
          <CommentField
            onSend={(comment) => console.log(comment)}
            placeholder="Write a message"
            className="border-0 border-t-[1px] rounded-none rounded-b-2xl border-offsetcolor"
          />
        </div>
      ) : (
        <div className="w-full sm:flex hidden items-center justify-center mb-10 h-[45rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
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
    </>
  );
};

export default MainChat;
