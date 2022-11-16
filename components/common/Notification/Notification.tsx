import {NotificationItem} from '@models/notification';
import {isoToHumanTime} from 'services/toHumanTime';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';
import Avatar from '../Avatar/Avatar';
import {EllipsisVerticalIcon} from '@heroicons/react/24/solid';
import Router from 'next/router';
import {useCallback} from 'react';

export interface NotificationProps {
  notification: NotificationItem;
  position?: 'FIRST' | 'LAST';
}

export function Notification({notification, position}: NotificationProps) {
  const redirectIfPossible = useCallback((notification: NotificationItem) => {
    switch (notification.type) {
      case 'FOLLOWED':
        if (notification?.data?.consolidate_number < 2)
          Router.push(
            notification?.data?.identity?.type === 'organizations'
              ? `/app/organization/${notification?.data?.identity?.meta?.shortname}`
              : `/app/user/${notification?.data?.identity?.meta?.username}`,
          );
        break;
      case 'COMMENT':
      case 'COMMENT_LIKE':
      case 'POST_LIKE':
      case 'SHARE_POST':
        if (notification.data.parentId)
          Router.push(`/app/post/${notification.data.parentId}`);
        break;
      case 'APPLICATION':
        if (notification.data.parentId && notification.ref_id)
          Router.push(
            `/app/projects/created/${notification.data.parentId}/applicants/${notification.ref_id}`,
          );
        break;
      case 'SHARE_PROJECT':
        if (notification.data.parentId)
          Router.push(`/app/projects/${notification.data.parentId}`);
        break;
      default:
        null;
        break;
    }
  }, []);

  const borderClass =
    position === 'FIRST'
      ? 'border rounded-t-xl'
      : position === 'LAST'
      ? 'border-r border-l border-b rounded-b-xl'
      : 'border-r border-l border-b';

  return (
    <div
      key={notification?.id}
      onClick={() => redirectIfPossible(notification)}
      className="cursor-pointer"
    >
      <div
        className={twMerge(
          'flex items-center bg-white px-4 py-2',
          borderClass && borderClass,
        )}
      >
        <div className="flex w-full flex-row items-center space-x-3">
          <div className="flex w-2/12 items-center sm:w-1/12">
            <Avatar
              size="l"
              type={
                notification?.data?.consolidate_number < 2
                  ? notification?.data?.identity?.type
                  : 'users'
              }
              src={
                (notification?.data?.consolidate_number < 2 &&
                  notification?.data?.identity?.meta?.avatar) ||
                notification?.data?.identity?.meta?.image ||
                ''
              }
            />
          </div>
          <div className="space-y-.5 w-9/12 sm:w-10/12">
            <p className="font-sm">{notification?.data.body.body}</p>
            <p className="font-sm text-graySubtitle">
              {isoToHumanTime(notification?.created_at ?? '')}
            </p>
          </div>
          {/* <div className="flex w-1/12 justify-end">
                    <EllipsisVerticalIcon className="w-5" />
                  </div> */}
        </div>
      </div>
    </div>
  );
}

export default Notification;
