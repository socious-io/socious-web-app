import {FC, PropsWithChildren} from 'react';
import styles from '../../created/NewProject/Layout/index.module.scss';
import {Modal} from '@components/common';
import {XMarkIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';
import {useProjectContext} from '../../created/NewProject/context';

type TLayoutType = {
  title: string;
};

const ApplyLayout: FC<PropsWithChildren<TLayoutType>> = ({children, title}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  return (
    <Modal
      isOpen={ProjectContext.isApplyModalOpen}
      className={`${styles.layoutBase} flex  max-w-xl flex-col p-0`}
    >
      <div className="flex justify-between border-b p-5 py-5">
        <div
          onClick={() =>
            setProjectContext({
              ...ProjectContext,
              formStep: ProjectContext.formStep - 1,
            })
          }
          className="cursor-pointer"
        >
          {ProjectContext.formStep === 1 && (
            <ChevronLeftIcon width={30} height={30} />
          )}
        </div>

        <div className="text-xl font-semibold">{title}</div>
        <div
          onClick={() =>
            setProjectContext({
              ...ProjectContext,
              isApplyModalOpen: !ProjectContext.isApplyModalOpen,
            })
          }
          className="cursor-pointer"
        >
          <XMarkIcon width={30} height={30} />
        </div>
      </div>
      <div className={`flex h-full w-full`}>
        <div className="flex h-full w-full">{children}</div>
      </div>
    </Modal>
  );
};

export default ApplyLayout;
