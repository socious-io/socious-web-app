import {FC, PropsWithChildren} from 'react';
import styles from './index.module.scss';
import {Modal} from '@components/common';
import {XMarkIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';
import {useProjectContext} from '../context';
type TLayoutType = {
  title: string;
};

export const CreateProjectLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  title,
}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  return (
    <Modal
      isOpen={ProjectContext.isModalOpen}
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
          {!(
            ProjectContext.formStep === 0 || ProjectContext.formStep === 4
          ) && <ChevronLeftIcon width={30} height={30} />}
        </div>

        <div className="text-xl font-semibold">{title}</div>
        <div
          onClick={() =>
            setProjectContext({
              ...ProjectContext,
              isModalOpen: !ProjectContext.isModalOpen,
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

export const FromLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={` ${styles.contentBase} flex w-full flex-col`}>
      {children}
    </div>
  );
};
