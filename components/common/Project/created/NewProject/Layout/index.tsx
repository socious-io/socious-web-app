import {FC, PropsWithChildren} from 'react';
import styles from './index.module.scss';
import {Modal} from '@components/common';
import {XMarkIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';
import {useProjectContext} from '../context';
import {twMerge} from 'tailwind-merge';
type TLayoutType = {
  title: string;
  isEdit?: boolean;
};

export const CreateProjectLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  title,
  isEdit = false,
}) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  return (
    <Modal
      isOpen={
        isEdit ? ProjectContext.isEditModalOpen : ProjectContext.isModalOpen
      }
      className={`${styles.layoutBase} flex  max-w-xl flex-col p-0`}
    >
      <div className="flex justify-between border-b p-5 py-5">
        <div
          onClick={() =>
            setProjectContext({
              ...ProjectContext,
              formStep: !isEdit
                ? ProjectContext.formStep === 6
                  ? 3
                  : ProjectContext.formStep - 1
                : ProjectContext.formStep - 1,
            })
          }
          className="cursor-pointer"
        >
          {!(
            ProjectContext.formStep === 0 ||
            ProjectContext.formStep === 5 ||
            isEdit
          ) && <ChevronLeftIcon width={30} height={30} />}
        </div>

        <div className="text-xl font-semibold">{title}</div>
        <div
          onClick={() =>
            setProjectContext({
              ...ProjectContext,
              isModalOpen: !ProjectContext.isModalOpen,
              isEditModalOpen: !ProjectContext.isEditModalOpen,
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

export const FormLayout: FC<
  PropsWithChildren<{type?: 'FULL'; className?: string}>
> = ({children, type, className}) => {
  return (
    <div
      className={twMerge(
        ` ${styles.contentBase} flex w-full flex-col`,
        type === 'FULL' && 'grow sm:grow-0',
        className && className,
      )}
    >
      {children}
    </div>
  );
};
