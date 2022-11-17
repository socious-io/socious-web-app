import {useState} from 'react';
import {GridLoader} from 'react-spinners';

// Components
import Button from '@components/common/Button/Button';
import Notification from './Notification';

// Hooks
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

// Types
import {NotificationItem} from '@models/notification';

const NotificationContainer = () => {
  const [page, setPage] = useState<number>(1);

  const {flattenData, seeMore, isLoading, loadMore} =
    useInfiniteSWR<NotificationItem>('/notifications');

  if (isLoading)
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  const totalCount = flattenData.length;

  return (
    <div className="w-full px-4 pb-4 lg:w-4/6 lg:space-y-2 lg:px-0">
      <div>
        {flattenData.map((notification, index) => (
          <Notification
            key={notification.id}
            notification={notification}
            position={
              index === 0
                ? 'FIRST'
                : index + 1 === totalCount
                ? 'LAST'
                : undefined
            }
          />
        ))}
      </div>
      {seeMore && (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="font-semibold text-primary"
            onClick={loadMore}
          >
            See more
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
