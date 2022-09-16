import {Avatar, SearchBar} from '@components/common';
import Bubble from '@components/common/Chat/Bubble/Bubble';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {DotsHorizontalIcon, PlusIcon} from '@heroicons/react/outline';

const Chat = () => {
  return (
    <div className="flex sm:mt-10 space-x-4 h-full">
      {/* SIDEBAR */}
      <div
        className="w-full sm:w-80 sm:border border-grayLineBased bg-background h-[45rem] rounded-2xl relative"
        aria-label="Sidebar"
      >
        {/* ADD PARTICIPANT BUTTON */}
        <div className="absolute bottom-10 right-4 p-3 bg-primary inline-block rounded-full">
          <PlusIcon className="w-6 text-white" />
        </div>

        <div className="relative">
          {/* HEADER */}
          <h3 className="font-semibold text-xl text-center font-worksans pt-7 pb-3.5">
            Chats
          </h3>
          {/* SEARCHBAR */}
          <div className="px-4 py-2.5 bg-offWhite border-offsetColor border-y-[0.5px] ">
            <SearchBar placeholder="Search name" />
          </div>
          {/* USER-CARD BOX */}
          <div>
            {/* USER-CARD */}
            <div className="font-normal flex items-center space-x-2 py-2.5 px-3 border-offsetColor border-b-[1px]">
              <Avatar size="l" src="" />
              <div className="grow">
                <p className="text-base">Name</p>
                <p className="text-graySubtitle text-sm">Message</p>
              </div>
              <div>
                <p className="text-grayInputField text-sm mx-auto">Time</p>
                <div className="mx-auto mt-2 rounded-full bg-primary text-white font-semibold w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                  <span className="text-xs">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CHAT BOX */}
      <div className="sm:flex hidden flex-col hidden w-full mb-10 h-[45rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
        <div className="flex items-center  space-x-2 px-4 pt-6 pb-2.5 border-offsetcolor border-b-[1px]">
          <Avatar size="l" src="" />
          <div className="grow">
            <p className="text-base cursor-pointer">Name</p>
            <p className="text-graySubtitle text-sm">Last Online</p>
          </div>
          <DotsHorizontalIcon className="w-7 p-1 rounded-full" />
        </div>
        <div className="grow overflow-y-auto w-full p-4 space-y-2">
          <Bubble />
          <Bubble self={false} link="www.google.com" />
        </div>
        <CommentField
          onSend={(comment) => console.log(comment)}
          placeholder="Write a message"
          className="border-0 border-t-[1px] rounded-none rounded-b-2xl border-offsetcolor"
        />
      </div>

      {/* NO PARTICIPANT BOX */}
      <div className="w-full flex hidden items-center justify-center mb-10 h-[45rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
        <div className="text-center font-worksans text-grayInputField max-w-[32rem]">
          <h2>Message your friends</h2>{' '}
          <p>
            Let’s make a great conversation with your trustworthy friends,
            partners
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
