import {Button} from '@components/common';
import {FC} from 'react';
import {useProjectContext} from '../../created/NewProject/context';
import {useRouter} from 'next/router';
const Congrats: FC = () => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-primary">
          Application sent!
        </div>
        <div className="mt-2 w-96 text-center text-base font-normal text-graySubtitle">
          Organization has received your application to review. Wait for them to
          respond to you.
        </div>
      </div>
      <div className="flex h-28 w-full items-center justify-center border-t">
        <Button
          onClick={() => {
            setProjectContext({
              ...ProjectContext,
              isApplyModalOpen: !ProjectContext.isApplyModalOpen,
            });
            router.push('/app/projects');
          }}
          className="m-4 flex w-8/12 items-center justify-center"
        >
          Back to projects
        </Button>
      </div>
    </div>
  );
};
export default Congrats;
