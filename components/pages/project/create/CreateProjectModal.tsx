import {FC, PropsWithChildren} from 'react';
import {Modal} from '@components/common';
import {XMarkIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';
import {twMerge} from 'tailwind-merge';
type TLayoutType = {
  title: string;
  isEdit?: boolean;
  onBack?: () => void;
  onClose: () => void;
};

export const CreateProjectModal: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  title,
  onBack,
  onClose,
}) => {
  return (
    <Modal className={'flex max-w-xl flex-col p-0'} isOpen={true}>
      <div className="flex justify-between border-b p-5 py-5">
        <div
          onClick={() => {
            onBack && onBack();
          }}
          className="cursor-pointer"
        >
          {onBack && <ChevronLeftIcon width={30} height={30} />}
        </div>

        <div className="text-xl font-semibold">{title}</div>
        <div
          onClick={() => {
            onClose();
          }}
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

export const FromLayout: FC<
  PropsWithChildren<{type?: 'FULL'; className?: string}>
> = ({children, type, className}) => {
  return (
    <div
      className={twMerge(
        'flex w-full flex-col',
        type === 'FULL' && 'grow sm:grow-0',
        className && className,
      )}
    >
      {children}
    </div>
  );
};
