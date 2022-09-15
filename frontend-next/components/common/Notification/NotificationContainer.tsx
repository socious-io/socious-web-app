import Button from '@components/common/Button/Button';
import Notification from './Notification';
import {useState} from 'react';

const NotificationContainer = () => {
  const [page, setPage] = useState<number>(1);
  const notifications = [];
  const [fullList, setFullList] = useState<boolean>(false);

  for (let i = 1; i <= page; i++) {
    notifications.push(
      <Notification page={i} key={i} onFull={() => setFullList(true)} />,
    );
  }

  return (
    <div className="px-4 w-full lg:w-4/6 lg:space-y-2 lg:px-0">
      <div>{notifications}</div>
      {!fullList && (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="text-primary font-semibold"
            onClick={() => setPage(page + 1)}
            disabled={fullList}
          >
            See more
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
