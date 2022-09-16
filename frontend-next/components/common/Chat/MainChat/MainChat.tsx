import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {ChevronLeftIcon, DotsHorizontalIcon} from '@heroicons/react/outline';
import {useUser} from '@hooks';
import React from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {get} from 'utils/request';
import Bubble from '../Bubble/Bubble';

const INVALID_UUID = 'invalid input syntax for type uuid:';

type MainChatProps = {
  selectedChat: any;
  goBack: () => void;
};

const MainChat = ({selectedChat, goBack}: MainChatProps) => {
  const {data, error: messageError} = useSWR<any>(
    selectedChat.id ? `/chats/${selectedChat.id}/messages` : null,
    get,
  );

  const {data: participant} = useSWRImmutable<any>(
    selectedChat?.participants?.[0]?.identity_meta?.id
      ? `/user/${selectedChat?.participants?.[0]?.identity_meta?.id}/profile`
      : null,
    get,
  );

  const {currentIdentity} = useUser();

  if (messageError?.response?.data?.error?.startsWith(INVALID_UUID)) goBack();

  const reversedMessages = data?.items?.reverse() ?? [];

  return (
    <>
      {/* ON CHAT SELECTED */}
      {data?.items && currentIdentity ? (
        <div className="h-screen flex flex-col w-full mb-10 sm:h-[48rem] sm:border border-grayLineBased bg-background sm:min-h-full sm:rounded-2xl">
          {/* ON CONVERSATION ALREADY STARTED */}
          <div className="flex items-center space-x-2 pt-12 px-4 sm:pt-6 pb-2.5 border-offsetcolor border-b-[1px]">
            <span className="block sm:hidden" onClick={goBack}>
              <ChevronLeftIcon className="w-5" />
            </span>
            <Avatar
              size="l"
              src={participant?.avatar?.url ?? ''}
              type={
                selectedChat?.participants?.[0]?.identity_type === 'users'
                  ? 0
                  : 1
              }
            />
            <div className="grow">
              <p className="text-base cursor-pointer">
                {participant.first_name + ' ' + participant.last_name}
              </p>
              <p className="text-graySubtitle text-sm">Last Online</p>
            </div>
            <DotsHorizontalIcon className="w-7 p-1 rounded-full" />
          </div>
          {data?.items.length > 0 ? (
            <div className="grow flex flex-col justify-end overflow-y-auto w-full p-4 space-y-2">
              {reversedMessages.map((message: any) => (
                <Bubble
                  key={message.id}
                  self={message.identity_id === currentIdentity?.id}
                  content={message.text}
                  identity_id={message.identity_id}
                  link={message.link ?? ''}
                />
              ))}
            </div>
          ) : (
            <div className="grow flex items-center justify-center w-full">
              <div>
                <Avatar />
              </div>
            </div>
          )}
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
