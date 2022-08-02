import {Avatar} from '@components/common';
import {DotsHorizontalIcon} from '@heroicons/react/outline';

export interface NotificationCardProps {
  action?: string;
  name?: string;
  time?: string;
  avatar?: string;
}

export function NotificationCard({
  action,
  name,
  time,
  avatar,
}: NotificationCardProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <Avatar size="l" src={avatar ?? ''} />
      </div>
      <div className="flex flex-col w-4/5">
        <p className="text-sm text-start">
          <label className="pr-2 font-semibold">{name}</label>
          <label>{action}</label>
        </p>

        <p className="text-sm text-graySubtitle">{time}</p>
      </div>
      <div>
        <DotsHorizontalIcon className="w-5" />
      </div>
    </div>
  );
}

export default NotificationCard;
