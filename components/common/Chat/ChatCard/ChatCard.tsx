import Avatar from '@components/common/Avatar/Avatar';
import Router from 'next/router';
import {isoToHumanTime} from 'services/toHumanTime';
import {twMerge} from 'tailwind-merge';

type ChatCardProps = {
  chat: any;
  onChatOpen: (data: string) => void;
};

const ChatCard = ({chat, onChatOpen}: ChatCardProps) => {
  return (
    <div
      className="flex max-w-full items-center space-x-2 border-b-[1px] border-offsetColor py-2.5 px-3 font-normal"
      onClick={() => Router.push(`/app/chat/${chat.id}`)}
    >
      <div className="cursor-pointer">
        <Avatar
          size="l"
          src={
            chat?.participants?.[0]?.identity_type === 'users'
              ? chat?.participants?.[0]?.identity_meta?.avatar
              : chat?.participants?.[0]?.identity_meta?.image
          }
          type={chat?.participants?.[0]?.identity_type}
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
        <div
          className={twMerge(
            'mx-auto mt-2 flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full font-semibold text-white',
            chat?.unread_count != '0' && 'bg-primary',
          )}
        >
          {chat?.unread_count != '0' && (
            <span className="text-xs">{chat?.unread_count}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
