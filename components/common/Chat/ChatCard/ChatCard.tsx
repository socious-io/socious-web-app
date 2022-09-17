import Avatar from '@components/common/Avatar/Avatar';
import {isoToHumanTime} from 'services/toHumanTime';
import useSWRImmutable from 'swr/immutable';
import {get} from 'utils/request';

type ChatCardProps = {
  chat: any;
  onChatOpen: (data: string) => void;
};

const ChatCard = ({chat, onChatOpen}: ChatCardProps) => {
  const {data: participant} = useSWRImmutable<any>(
    chat?.participants?.[0]?.identity_meta?.id
      ? `/user/${chat?.participants?.[0]?.identity_meta?.id}/profile`
      : null,
    get,
  );

  return (
    <div
      className="font-normal flex max-w-full items-center space-x-2 py-2.5 px-3 border-offsetColor border-b-[1px]"
      onClick={() => onChatOpen(chat)}
    >
      <div className="cursor-pointer">
        <Avatar
          size="l"
          src={participant?.avatar?.url ?? ''}
          type={chat?.participants?.[0]?.identity_type === 'users' ? 0 : 1}
        />
      </div>
      <div className="grow w-2/5 cursor-pointer">
        <p className="text-base">
          {
            chat?.type === "CHAT"
              ? chat?.participants?.[0]?.identity_meta?.name 
              : chat?.name
          }
        </p>
        <p className="text-graySubtitle text-sm truncate">
          {chat?.last_message?.text}
        </p>
      </div>
      <div className="cursor-default">
        <p className="text-grayInputField text-sm mx-auto">
          {chat.updated_at ? isoToHumanTime(chat.updated_at) : '0 min ago'}
        </p>
        <div className="mx-auto mt-2 rounded-full bg-primary text-white font-semibold w-[1.25rem] h-[1.25rem] flex justify-center items-center">
          <span className="text-xs">{chat?.unread_count}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
