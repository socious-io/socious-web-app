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
      className="flex max-w-full items-center space-x-2 border-b-[1px] border-offsetColor py-2.5 px-3 font-normal"
      onClick={() => onChatOpen(chat)}
    >
      <div className="cursor-pointer">
        <Avatar
          size="l"
          src={participant?.avatar?.url ?? ''}
          type={chat?.participants?.[0]?.identity_type === 'users' ? 0 : 1}
        />
      </div>
      <div className="w-2/5 grow cursor-pointer">
        <p className="text-base">
          {chat?.type === 'CHAT'
            ? chat?.participants?.[0]?.identity_meta?.name
            : chat?.name}
        </p>
        <p className="truncate text-sm text-graySubtitle">
          {chat?.last_message?.text}
        </p>
      </div>
      <div className="cursor-default">
        <p className="mx-auto text-sm text-grayInputField">
          {chat.updated_at ? isoToHumanTime(chat.updated_at) : '0 min ago'}
        </p>
        <div className="mx-auto mt-2 flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full bg-primary font-semibold text-white">
          <span className="text-xs">{chat?.unread_count}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;