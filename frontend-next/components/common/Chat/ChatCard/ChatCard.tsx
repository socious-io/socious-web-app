import Avatar from '@components/common/Avatar/Avatar';
import useSWR from 'swr';
import {get} from 'utils/request';

type ChatCardProps = {
  chat: any;
  onChatOpen: (data: string) => void;
};

const ChatCard = ({chat, onChatOpen}: ChatCardProps) => {
  const {data: participant} = useSWR<any>(
    chat?.participants?.[0]?.identity_meta?.id
      ? `/user/${chat?.participants?.[0]?.identity_meta?.id}/profile`
      : null,
    get,
  );

  console.log('PARTICIPANT', participant);
  return (
    <div
      className="font-normal flex max-w-full items-center space-x-2 py-2.5 px-3 border-offsetColor border-b-[1px]"
      onClick={() => onChatOpen(chat.id)}
    >
      <div>
        <Avatar
          size="l"
          src={participant?.avatar?.url ?? ''}
          type={chat?.participants?.[0]?.identity_type === 'users' ? 0 : 1}
        />
      </div>
      <div className="grow w-2/5">
        <label className="text-base">{chat?.name}</label>
        <p className="text-graySubtitle text-sm truncate">
          {chat?.last_message?.text}
        </p>
      </div>
      <div>
        {/* TODO:: After merging with main, time to human time. ( chat?.updated_at ) */}
        <p className="text-grayInputField text-sm mx-auto">Time</p>
        <div className="mx-auto mt-2 rounded-full bg-primary text-white font-semibold w-[1.25rem] h-[1.25rem] flex justify-center items-center">
          <span className="text-xs">{chat?.unread_count}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
