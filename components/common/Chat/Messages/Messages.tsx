import {MessageType} from '@models/message';
import {useUser} from '@hooks';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {isoToHumanTime} from 'services/toHumanTime';
import Bubble from '../Bubble/Bubble';
import Avatar from '@components/common/Avatar/Avatar';

interface MessagesProps {
  infiniteMessage: any[];
  noMoreMessage: boolean;
  loadMore: () => void;
  activeChat: any;
}

const Messages = ({
  infiniteMessage,
  loadMore,
  noMoreMessage,
  activeChat,
}: MessagesProps) => {
  const {currentIdentity} = useUser();
  const chatBoxRef = useRef<HTMLDivElement>(null);
  let previousMessage = useRef<MessageType | null>(null);

  const oldestMessage = useMemo(
    () =>
      infiniteMessage?.[infiniteMessage.length - 1]?.items?.[
        infiniteMessage[infiniteMessage.length - 1].items?.length - 1
      ],
    [infiniteMessage],
  );

  const onScroll = useCallback(() => {
    if (!chatBoxRef?.current || noMoreMessage) return;
    const {scrollTop, scrollHeight, clientHeight} = chatBoxRef.current;
    if (Math.floor(scrollTop) === clientHeight - scrollHeight) {
      loadMore();
    }
  }, [loadMore, noMoreMessage]);

  const showDate = useCallback(
    (message: MessageType) => {
      const messageDate = isoToHumanTime(message.created_at);
      const previousDate =
        !!previousMessage.current &&
        isoToHumanTime(previousMessage.current?.created_at);

      message === oldestMessage
        ? (previousMessage.current = null)
        : (previousMessage.current = message);

      return previousDate && previousDate != messageDate ? (
        <p className="my-1 text-center">{previousDate}</p>
      ) : (
        <></>
      );
    },
    [oldestMessage],
  );

  return (
    <>
      {infiniteMessage?.[0]?.items.length > 0 ? (
        <div className="flex w-full grow flex-col overflow-y-auto p-4">
          <div
            className="hide-scrollbar mt-auto flex flex-col-reverse overflow-y-auto"
            ref={chatBoxRef}
            onScroll={onScroll}
          >
            {/* ORDER IS REVERSED BC OF COL-REVERSE. */}
            {infiniteMessage?.map((page: any) =>
              page?.items?.map((message: MessageType) => (
                <>
                  {/* CONDITIONALLY SHOW THIS DATE */}
                  {showDate(message)}
                  <Bubble
                    key={message.id}
                    self={message.identity_id === currentIdentity?.id}
                    content={message.text}
                    userInfo={
                      message.identity_id === currentIdentity?.id
                        ? {
                            identity_meta: currentIdentity.meta,
                            identity_type: currentIdentity.type,
                          }
                        : activeChat.participants.find(
                            (x: any) =>
                              x.identity_meta.id === message.identity_id,
                          )
                    }
                  />
                  {/* OLDEST MESSAGE */}
                  {oldestMessage === message && (
                    <p className="my-1 text-center">
                      {isoToHumanTime(message.created_at)}
                    </p>
                  )}
                </>
              )),
            )}
            {/* ON NO MORE MESSAGES */}
            {noMoreMessage && (
              <p className="my-1 text-center"> No more Messages!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full grow items-center justify-center text-center">
          <div>
            <Avatar
              size="xxl"
              type={
                activeChat?.participants?.[0]?.identity_type === 'users' ? 0 : 1
              }
              src={
                activeChat?.participants?.[0]?.identity_type === 'users'
                  ? activeChat?.participants?.[0]?.identity_meta?.avatar
                  : activeChat?.participants?.[0]?.identity_meta?.image
              }
            />
            <div className="mt-2 space-y-2">
              <h2 className="text-2xl text-primary">Start charting with</h2>
              <h2 className="text-2xl">
                {activeChat?.type === 'CHAT'
                  ? activeChat?.participants?.[0]?.identity_meta?.name
                  : activeChat?.name}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
