import {FC, PropsWithChildren} from 'react';
import styles from '../../created/NewProject/Layout/index.module.scss';
import {Modal} from '@components/common';
import {XMarkIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';
import {useProjectContext, initContext} from '../../created/NewProject/context';

type TLayoutType = {
  title: string;
};

const ApplyLayout: FC<PropsWithChildren<TLayoutType>> = ({children, title}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  return (
    <Modal
      isOpen={ProjectContext.isApplyModalOpen}
      className={`${styles.layoutBase} -m-4 flex h-screen !w-screen max-w-xl flex-col rounded-none p-0 pt-14 sm:m-0 sm:rounded-2xl sm:pt-0`}
    >
      <div
        className={`flex justify-between ${
          ProjectContext.formStep !== 2 && 'border-b'
        } p-5 py-5`}
      >
        {!(ProjectContext.formStep === 0 || ProjectContext.formStep === 2) ? (
          <div
            onClick={() =>
              setProjectContext({
                ...ProjectContext,
                formStep:
                  ProjectContext.formStep === 3
                    ? 0
                    : ProjectContext.formStep - 1,
              })
            }
            className="cursor-pointer"
          >
            <ChevronLeftIcon width={30} height={30} />
          </div>
        ) : (
          <div />
        )}
        <div className="text-xl font-semibold">{title}</div>
        <div
          onClick={() => setProjectContext(initContext)}
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
