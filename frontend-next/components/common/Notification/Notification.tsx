import {NotificationItem} from '@models/notification';
import {isoToHumanTime} from 'services/toHumanTime';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';
import Avatar from '../Avatar/Avatar';
import {DotsVerticalIcon} from '@heroicons/react/solid';

export interface NotificationProps {
  page: number;
  onFull: () => void;
}

export function Notification({page, onFull}: NotificationProps) {
  const {data: notifications, error: postsErrors} = useSWR<any>(
    page ? `/notifications?page=${page}` : null,
    get,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      onErrorRetry: (error) => {
        if (error?.response?.status === 401) return;
      },
    },
  );

  if (
    notifications &&
    notifications.total_count &&
    page * 10 >= notifications.total_count
  ) {
    onFull();
  }

  return (
    <>
      {notifications?.items?.map(
        (notification: NotificationItem, index: number) => {
          const borderClass =
            index === 0
              ? 'border rounded-t-xl'
              : index === notifications?.items?.length - 1
              ? 'border-r border-l border-b rounded-b-xl'
              : 'border-r border-l border-b';

          return (
            <div key={notification?.id}>
              <div
                className={twMerge(
                  'flex items-center bg-white px-4 py-2',
                  borderClass && borderClass,
                )}
              >
                <div className="flex w-full flex-row items-center space-x-3">
                  <div className="flex w-1/12 items-center">
                    <Avatar
                      size="l"
                      src={notification?.data?.identity?.meta?.avatar || ''}
                    />
                  </div>
                  <div className="space-y-.5 w-10/12 ">
                    <p className="font-sm">{notification?.data.body.body}</p>
                    <p className="font-sm text-graySubtitle">
                      {isoToHumanTime(notification?.created_at ?? '')}
                    </p>
                  </div>
                  <div className="flex w-1/12 justify-end">
                    <DotsVerticalIcon className="w-5" />
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
    </>
  );
}

export default Notification;
