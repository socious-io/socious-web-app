import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {ChevronLeftIcon, DotsHorizontalIcon} from '@heroicons/react/outline';
import {useUser} from '@hooks';
import {identity} from 'lodash';
import React, {useEffect} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import Bubble from '../Bubble/Bubble';

const INVALID_UUID = 'invalid input syntax for type uuid:';

type MainChatProps = {
  selectedChat: string;
  goBack: () => void;
};

const MainChat = ({selectedChat, goBack}: MainChatProps) => {
  const {data, error: messageError} = useSWR<any>(
    selectedChat ? `/chats/${selectedChat}/messages` : null,
    get,
  );

  const {currentIdentity, user} = useUser();

  if (messageError?.response?.data?.error?.startsWith(INVALID_UUID)) goBack();

  return (
    <>
      {data?.items && currentIdentity ? (
        <div className="h-screen flex flex-col w-full mb-10 sm:h-[48rem] sm:border border-grayLineBased bg-background sm:min-h-full sm:rounded-2xl">
          <div className="flex items-center space-x-2 pt-12 px-4 sm:pt-6 pb-2.5 border-offsetcolor border-b-[1px]">
            <span className="block sm:hidden" onClick={goBack}>
              <ChevronLeftIcon className="w-5" />
            </span>
            <Avatar
              size="l"
              src={user?.avatar?.url ?? ''}
              type={currentIdentity?.type === 'users' ? 0 : 1}
            />
            <div className="grow">
              <p className="text-base cursor-pointer">Name</p>
              <p className="text-graySubtitle text-sm">Last Online</p>
            </div>
            <DotsHorizontalIcon className="w-7 p-1 rounded-full" />
          </div>
          <div className="grow flex flex-col justify-end overflow-y-auto w-full p-4 space-y-2">
            {data.items.reverse().map((message: any) => (
              <Bubble
                key={message.id}
                self={message.identity_id === currentIdentity?.id}
                content={message.text}
                identity_id={message.identity_id}
                link={message.link ?? ''}
              />
            ))}
          </div>
          <CommentField
            onSend={(comment) => console.log(comment)}
            placeholder="Write a message"
            className="border-0 border-t-[1px] rounded-none rounded-b-2xl border-offsetcolor"
          />
        </div>
      ) : (
        <div className="w-full sm:flex hidden items-center justify-center mb-10 h-[48rem] border border-grayLineBased bg-background sm:min-h-full rounded-2xl">
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
