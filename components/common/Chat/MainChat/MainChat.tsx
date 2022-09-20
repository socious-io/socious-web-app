import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {useUser} from '@hooks';
import React from 'react';
import useSWR from 'swr';
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

  console.log('MESSAGES :---: ', data);

  const {user, currentIdentity} = useUser();

  if (messageError?.response?.data?.error?.startsWith(INVALID_UUID)) goBack();

  const reversedMessages = data?.items?.reverse() ?? [];

  return (
    <>
      {/* ON CHAT SELECTED */}
      {data?.items && currentIdentity ? (
        <div className="mb-10 flex h-screen w-full flex-col border-grayLineBased bg-background sm:h-[48rem] sm:min-h-full sm:rounded-2xl sm:border">
          {/* ON CONVERSATION ALREADY STARTED */}
          <div className="border-offsetcolor flex items-center space-x-2 border-b-[1px] px-4 pt-12 pb-2.5 sm:pt-6">
            <span className="block sm:hidden" onClick={goBack}>
              <ChevronLeftIcon className="w-5" />
            </span>
            <Avatar
              size="l"
              src={
                selectedChat?.participants?.[0]?.identity_type === 'users'
                  ? selectedChat?.participants?.[0]?.identity_meta?.avatar
                  : selectedChat?.participants?.[0]?.identity_meta?.image
              }
              type={
                selectedChat?.participants?.[0]?.identity_type === 'users'
                  ? 0
                  : 1
              }
            />
            <div className="grow">
              <p className="cursor-pointer text-base">
                {selectedChat?.type === 'CHAT'
                  ? selectedChat?.participants?.[0]?.identity_meta?.name
                  : selectedChat?.name}
              </p>
              <p className="text-sm text-graySubtitle">Last Online</p>
            </div>
            <EllipsisHorizontalIcon className="w-7 rounded-full p-1" />
          </div>
          {data?.items.length > 0 ? (
            <div className="flex w-full grow flex-col justify-end space-y-2 overflow-y-auto p-4">
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
            <div className="flex w-full grow items-center justify-center text-center">
              <div>
                <Avatar
                  size="xxl"
                  type={
                    selectedChat?.participants?.[0]?.identity_type === 'users'
                      ? 0
                      : 1
                  }
                  src={
                    selectedChat?.participants?.[0]?.identity_type === 'users'
                      ? selectedChat?.participants?.[0]?.identity_meta?.avatar
                      : selectedChat?.participants?.[0]?.identity_meta?.image
                  }
                />
                <div className="mt-2 space-y-2">
                  <h2 className="text-2xl text-primary">Start charting with</h2>
                  <h2 className="text-2xl">
                    {selectedChat?.type === 'CHAT'
                      ? selectedChat?.participants?.[0]?.identity_meta?.name
                      : selectedChat?.name}
                  </h2>
                </div>
              </div>
            </div>
          )}
          <CommentField
            src={
              currentIdentity?.type === 'users'
                ? user?.avatar?.url
                : user?.image?.url
            }
            avatarSize="m"
            onSend={(comment) => console.log(comment)}
            placeholder="Write a message"
            className="border-offsetcolor rounded-none rounded-b-2xl border-0 border-t-[1px]"
          />
        </div>
      ) : (
        <div className="mb-10 hidden h-[48rem] w-full items-center justify-center rounded-2xl border border-grayLineBased bg-background sm:flex sm:min-h-full">
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
    </>
  );
};

export default MainChat;
