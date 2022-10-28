import {readMessage, sendMessage} from '@api/chat/message/actions';
import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {CreateMessageResponseType, MessageType} from '@models/message';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import Messages from '../Messages/Messages';
import {useUser} from '@hooks';
import {get} from 'utils/request';
import Router from 'next/router';
import useSWR from 'swr';
import {isoToHumanTime} from 'services/toHumanTime';
import Link from 'next/link';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

const INVALID_UUID = 'invalid input syntax for type uuid:';

type MainChatProps = {
  activeChat: any;
  refreshSideBar: () => void;
};

const MainChat = ({activeChat, refreshSideBar}: MainChatProps) => {
  const {user, currentIdentity} = useUser();

  const {
    flattenData: flattenMessages,
    infiniteError,
    isLoading,
    mutateInfinite,
    seeMore,
    loadMore,
  } = useInfiniteSWR<MessageType>(
    activeChat?.id ? `/chats/${activeChat.id}/messages` : null,
    {
      shouldRetryOnError: false,
    },
  );

  if (infiniteError?.response?.data?.error?.startsWith(INVALID_UUID))
    Router.push('/app/chat');

  const {
    data: participants,
    error: participantsError,
    mutate: mutateParticipant,
  } = useSWR<any>(
    activeChat?.id ? `/chats/${activeChat.id}/participants` : null,
    get,
  );

  const latestMessage = useMemo(
    () => flattenMessages?.[0] || null,
    [flattenMessages],
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
    [activeChat?.id, mutateInfinite],
  );

  // READ MESSAGE
  useEffect(() => {
    if (!activeChat || !latestMessage?.id) return;
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

  // On IdentityChange Refreshing Sidebar and route back to /app/chat.
  useEffect(() => {
    if (!currentIdentity?.id || !participants) return;
    if (
      !participants?.items?.find(
        (participant: any) => participant?.identity_id === currentIdentity?.id,
      )
    ) {
      Router.push('/app/chat');
    } else {
      mutateParticipant();
    }
    refreshSideBar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdentity?.id]);

  if ((!participants && !participantsError) || isLoading)
    return <p>Loading....</p>;

  const interlocutor = otherParticipants?.[0];
  const link = interlocutor
    ? `/app/${
        interlocutor.identity_type === 'users' ? 'user' : 'organization'
      }/${
        interlocutor.identity_type === 'users'
          ? interlocutor.identity_meta.username
          : interlocutor.identity_meta.shortname
      }`
    : '';

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
          {interlocutor ? (
            <Link href={link}>
              <a href={link} className="flex items-center space-x-2">
                <Avatar
                  size="l"
                  src={
                    interlocutor.identity_type === 'users'
                      ? interlocutor.identity_meta?.avatar
                      : interlocutor.identity_meta?.image
                  }
                  type={interlocutor.identity_type}
                />
                <div className="grow">
                  <p className="cursor-pointer text-base">
                    {activeChat?.type === 'CHAT'
                      ? interlocutor.identity_meta?.name
                      : activeChat?.name}
                  </p>
                  <p className="text-sm text-graySubtitle">
                    {isoToHumanTime(interlocutor.last_read_at)}
                  </p>
                </div>
              </a>
            </Link>
          ) : null}
          {/* <EllipsisHorizontalIcon className="w-7 rounded-full p-1" /> */}
        </div>
        <Messages
          infiniteMessage={flattenMessages ?? []}
          noMoreMessage={!seeMore}
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
