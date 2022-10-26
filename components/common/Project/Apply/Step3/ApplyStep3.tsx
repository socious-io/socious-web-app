import {Button} from '@components/common';
import {FC} from 'react';
import {initContext, useProjectContext} from '../../created/NewProject/context';
const Congrats: FC<{orgName: string}> = ({orgName}) => {
  const {setProjectContext} = useProjectContext();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-12 flex h-full flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-primary">
          Application sent!
        </div>
        <div className="mt-2 max-w-sm text-center text-base font-normal text-graySubtitle">
          {orgName} has received your application to review. Wait for them to
          respond to you.
        </div>
      </div>
      <div className="flex h-28 w-full items-center justify-center border-t">
        <Button
          onClick={() => setProjectContext(initContext)}
          className="m-4 flex w-8/12 items-center justify-center"
        >
          Back to project
        </Button>
      </div>
    </div>
  );
};
export default Congrats;
