import {Avatar, SearchBar} from '@components/common';

const Chat = () => {
  return (
    <div className="flex mt-10 space-x-4 h-full">
      <div
        className="w-80 border border-grayLineBased bg-background h-[38rem] rounded-2xl"
        aria-label="Sidebar"
      >
        <div className="">
          <h3 className="font-semibold text-xl text-center font-worksans pt-7 pb-3.5">
            Chats
          </h3>
          <div className="px-4 py-2.5 bg-offWhite">
            <SearchBar placeholder="Search name" />
          </div>
          <div className="">
            <div className="font-normal flex items-center space-x-2 p-4">
              <Avatar size="l" src="" />
              <div className="grow">
                <p>Name</p>
                <p className="font-base text-graySubtitle font-sm">Message</p>
              </div>
              <div>
                <p className="text-grayInputField font-sm">Time</p>
                <div className="rounded-full bg-primary text-white font-semibold font-xs w-[1.5rem] h-[1.5rem] text-center">
                  <span className="inline-block leading-6">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-10 h-[38rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil magnam
          reiciendis quibusdam doloremque error molestiae optio inventore
          consectetur repellendus maiores qui repudiandae, illo, commodi
          aspernatur veritatis ducimus perspiciatis asperiores iure.
        </p>
      </div>

      <div className="w-full flex hidden items-center justify-center mb-10 h-[38rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
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
