import {Button} from '@components/common';
import {FC} from 'react';

const Congrats: FC<{onClose: () => void}> = ({onClose}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-primary">
          Project created
        </div>
        <div className="mt-2 w-96 text-center text-base font-normal text-graySubtitle">
          Your project is posted and now visible for users to apply.
        </div>
      </div>
      <div className="flex h-28 w-full items-center justify-center border-t">
        <Button
          onClick={() => onClose()}
          className="m-4 flex w-8/12 items-center justify-center"
        >
          Back to project
        </Button>
      </div>
    </div>
  );
};
export default Congrats;
