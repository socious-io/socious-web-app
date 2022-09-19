import {sendMessage} from '@api/chat/actions';
import Avatar from '@components/common/Avatar/Avatar';
import CommentField from '@components/common/Post/CommentField/CommentField';
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {useUser} from '@hooks';
import {createMessageResponseType, MessageType} from '@models/message';
import {useCallback, useEffect, useMemo, useState} from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {get} from 'utils/request';
import Bubble from '../Bubble/Bubble';

// chat_id: '3ee86b36-503b-484c-af79-11e79e7a1bd2';
// created_at: '2022-09-19T03:14:24.441Z';
// deleted_at: null;
// id: '00a81471-2dde-4409-98cb-2715fc19ed67';
// identity_id: 'a505d9b6-97cb-4784-a586-3067d73dbdcc';
// media: null;
// replied: false;
// reply_id: null;
// text: 'hello';
// updated_at: '2022-09-19T03:14:24.441Z';

// chat_id: '3ee86b36-503b-484c-af79-11e79e7a1bd2';
// created_at: '2022-09-19T03:14:24.441Z';
// deleted_at: null;
// id: '00a81471-2dde-4409-98cb-2715fc19ed67';
// identity_id: 'a505d9b6-97cb-4784-a586-3067d73dbdcc';
// media: null;
// media_url: null;
// replied: false;
// reply_id: null;
// text: 'hello';
// updated_at: '2022-09-19T03:14:24.441Z';

const INVALID_UUID = 'invalid input syntax for type uuid:';

type MainChatProps = {
  selectedChat: any;
  goBack: () => void;
};

const MainChat = ({selectedChat, goBack}: MainChatProps) => {
  const {
    data,
    error: messageError,
    mutate,
  } = useSWR<any>(
    selectedChat.id ? `/chats/${selectedChat.id}/messages` : null,
    get,
  );

  const {data: participant} = useSWRImmutable<any>(
    selectedChat?.participants?.[0]?.identity_meta?.id
      ? `/user/${selectedChat?.participants?.[0]?.identity_meta?.id}/profile`
      : null,
    get,
  );

  const [reversedMessages, setReversedMessages] = useState<MessageType[]>([]);
  const {currentIdentity} = useUser();

  if (messageError?.response?.data?.error?.startsWith(INVALID_UUID)) goBack();

  useEffect(() => {
    if (data?.items) setReversedMessages(data.items.reverse());
  }, [data?.items]);

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
        setReversedMessages((old) => [...old, newMessage]);
      } catch (error) {
        console.error(error);
      }
    },
    [selectedChat],
  );
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
          {data?.items.length > 0 ? (
            <div className="flex w-full grow flex-col space-y-2 overflow-y-auto p-4">
              <div className="hide-scrollbar mt-auto space-y-2 overflow-y-auto">
                {reversedMessages?.map((message: any) => (
                  <Bubble
                    key={message.id}
                    self={message.identity_id === currentIdentity?.id}
                    content={message.text}
                    identity_id={message.identity_id}
                    link={message.link ?? ''}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex w-full grow items-center justify-center">
              <div>
                <Avatar />
              </div>
            </div>
          )}
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
