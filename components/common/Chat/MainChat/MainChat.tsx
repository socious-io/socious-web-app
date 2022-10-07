import {readMessage, sendMessage} from '@api/chat/message/actions';
import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {CreateMessageResponseType} from '@models/message';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import useSWRInfinite from 'swr/infinite';
import Messages from '../Messages/Messages';
import {useUser} from '@hooks';
import {get} from 'utils/request';
import Router from 'next/router';
import useSWR from 'swr';
import {isoToHumanTime} from 'services/toHumanTime';

const INVALID_UUID = 'invalid input syntax for type uuid:';

type MainChatProps = {
  activeChat: any;
  refreshSideBar: () => void;
};

const MainChat = ({activeChat, refreshSideBar}: MainChatProps) => {
  const getKey = useCallback(
    (initialSize: number, previousData: any) => {
      if (!activeChat?.id || (previousData && previousData?.items?.length < 10))
        return null;
      return `/chats/${activeChat.id}/messages?page=${initialSize + 1}`;
    },
    [activeChat],
  );

  const {user, currentIdentity} = useUser();

  const {
    data: infiniteMessage,
    error: infiniteError,
    mutate: mutateInfinite,
    size,
    setSize,
  } = useSWRInfinite<any>(getKey, get, {
    shouldRetryOnError: false,
  });

  if (infiniteError?.response?.data?.error?.startsWith(INVALID_UUID))
    Router.push('/app/chat');

  const {data: participants, error: participantsError} = useSWR<any>(
    activeChat?.id ? `/chats/${activeChat.id}/participants` : null,
    get,
  );
  const noMoreMessage = useMemo(
    () => size * 10 >= infiniteMessage?.[0]?.['total_count'],
    [size, infiniteMessage],
  );

  const loadMore = useCallback(() => setSize((old) => old + 1), [setSize]);

  const latestMessage = useMemo(
    () => infiniteMessage?.[0].items[0] || null,
    [infiniteMessage],
  );

  const onSendMessage = useCallback(
    async (message: string) => {
      try {
        // SENDING NEW MESSAGE
        const response: CreateMessageResponseType = await sendMessage(
          activeChat.id,
          {
            text: message,
          },
        );
        // READING NEW SEND MESSAGE
        await readMessage(activeChat.id, response.id);
        // MUTATING MESSAGES
        const newMessage = {...response, media_url: null};
        mutateInfinite(
          (old) => {
            old?.[0]?.items.unshift(newMessage);
            return old;
          },
          {revalidate: false},
        );
      } catch (error) {
        console.error(error);
      }
    },
    [mutateInfinite, activeChat],
  );

  useEffect(() => {
    if (!activeChat || !latestMessage) return;
    readMessage(activeChat.id, latestMessage.id)
      .then(() => {
        refreshSideBar();
      })
      .catch((error) => console.log('ERROR from READ :---:', error));
  }, [activeChat, latestMessage, refreshSideBar]);

  const otherParticipants = useMemo(
    () =>
      participants?.items?.filter(
        (x: any) => x.identity_id != currentIdentity?.id,
      ),
    [currentIdentity, participants],
  );

  if (
    (!participants && !participantsError) ||
    (!infiniteMessage && !infiniteError)
  )
    return <p>Loading....</p>;

  return (
    <>
      {/* ON CHAT SELECTED */}
      <div className="flex h-screen w-full flex-col border-grayLineBased bg-background sm:mb-10 sm:h-[48rem] sm:rounded-2xl sm:border">
        {/* ON CONVERSATION ALREADY STARTED */}
        <div className="border-offsetcolor flex items-center space-x-2 border-b-[1px] px-4 pt-12 pb-2.5 sm:pt-6">
          <span
            className="block sm:hidden"
            onClick={() => Router.push('/app/chat')}
          >
            <ChevronLeftIcon className="w-5" />
          </span>
          <Avatar
            size="l"
            src={
              otherParticipants?.[0]?.identity_type === 'users'
                ? otherParticipants?.[0]?.identity_meta?.avatar
                : otherParticipants?.[0]?.identity_meta?.image
            }
            type={otherParticipants?.[0]?.identity_type}
          />
          <div className="grow">
            <p className="cursor-pointer text-base">
              {activeChat?.type === 'CHAT'
                ? otherParticipants?.[0]?.identity_meta?.name
                : activeChat?.name}
            </p>
            <p className="text-sm text-graySubtitle">
              {isoToHumanTime(otherParticipants?.[0]?.last_read_at)}
            </p>
          </div>
          <EllipsisHorizontalIcon className="w-7 rounded-full p-1" />
        </div>
        <Messages
          infiniteMessage={infiniteMessage ?? []}
          noMoreMessage={noMoreMessage}
          loadMore={loadMore}
          activeChat={activeChat}
          otherParticipants={otherParticipants}
        />
        <CommentField
          src={
            currentIdentity?.type === 'users'
              ? user?.avatar?.url
              : user?.image?.url
          }
          type={currentIdentity?.type}
          avatarSize="m"
          onSend={onSendMessage}
          placeholder="Write a message"
          className="border-offsetcolor rounded-none rounded-b-2xl border-0 border-t-[1px]"
          row={1}
        />
      </div>
    </>
  );
};

export default MainChat;
