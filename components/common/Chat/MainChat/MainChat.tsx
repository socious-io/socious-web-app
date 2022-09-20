import {sendMessage} from '@api/chat/actions';
import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {createMessageResponseType} from '@models/message';
import {useCallback, useMemo} from 'react';
import useSWRInfinite from 'swr/infinite';
import useSWRImmutable from 'swr/immutable';
import {get} from 'utils/request';
import Messages from '../Messages/Messages';

const INVALID_UUID = 'invalid input syntax for type uuid:';

type MainChatProps = {
  selectedChat: any;
  goBack: () => void;
};

const MainChat = ({selectedChat, goBack}: MainChatProps) => {
  const getKey = useCallback(
    (initialSize: number, previousData: any) => {
      if (
        !selectedChat.id ||
        (previousData && previousData?.items?.length < 10)
      )
        return null;
      console.log('I am making request with ', initialSize);
      return `/chats/${selectedChat.id}/messages?page=${initialSize + 1}`;
    },
    [selectedChat],
  );

  const {
    data: infiniteMessage,
    error: infiniteError,
    mutate: mutateInfinite,
    size,
    setSize,
  } = useSWRInfinite<any>(getKey, get, {
    shouldRetryOnError: false,
  });

  if (infiniteError?.response?.data?.error?.startsWith(INVALID_UUID)) goBack();

  const {data: participant} = useSWRImmutable<any>(
    selectedChat?.participants?.[0]?.identity_meta?.id
      ? `/user/${selectedChat?.participants?.[0]?.identity_meta?.id}/profile`
      : null,
    get,
  );

  const noMoreMessage = useMemo(
    () => size * 10 >= infiniteMessage?.[0]?.['total_count'],
    [size, infiniteMessage],
  );

  const loadMore = useCallback(() => setSize((old) => old + 1), [setSize]);

  const onSendMessage = useCallback(
    async (message: string) => {
      try {
        const response: createMessageResponseType = await sendMessage(
          selectedChat.id,
          {
            text: message,
          },
        );
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
    [mutateInfinite, selectedChat],
  );

  return (
    <>
      {/* ON CHAT SELECTED */}
      {selectedChat?.id ? (
        <div className="mb-10 flex h-screen w-full flex-col border-grayLineBased bg-background sm:h-[48rem] sm:min-h-full sm:rounded-2xl sm:border">
          {/* ON CONVERSATION ALREADY STARTED */}
          <div className="border-offsetcolor flex items-center space-x-2 border-b-[1px] px-4 pt-12 pb-2.5 sm:pt-6">
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
              <p className="cursor-pointer text-base">
                {selectedChat?.type === 'CHAT'
                  ? selectedChat?.participants?.[0]?.identity_meta?.name
                  : selectedChat?.name}
              </p>
              <p className="text-sm text-graySubtitle">Last Online</p>
            </div>
            <EllipsisHorizontalIcon className="w-7 rounded-full p-1" />
          </div>
          <Messages
            infiniteMessage={infiniteMessage ?? []}
            noMoreMessage={noMoreMessage}
            loadMore={loadMore}
          />
          <CommentField
            onSend={onSendMessage}
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
