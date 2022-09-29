import {FC, PropsWithChildren} from 'react';
import styles from './index.module.scss';
import {Modal} from '@components/common';
import {XMarkIcon, ChevronLeftIcon} from '@heroicons/react/24/solid';
type TLayoutType = {
  title: string;
  onClose: () => void;
  isOpen: boolean;
  setFormStep: (x: number) => void;
  formStep: number;
};

const CreateProjectLayout: FC<PropsWithChildren<TLayoutType>> = ({
  children,
  isOpen,
  title,
  onClose,
  setFormStep,
  formStep,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      className={`${styles.layoutBase} flex  max-w-xl flex-col p-0`}
    >
      {formStep < 5 ? (
        <div className="flex justify-between border-b p-5 py-5">
          <div
            onClick={() => setFormStep(formStep - 1)}
            className="cursor-pointer"
          >
            {!(formStep === 0 || formStep === 4) && (
              <ChevronLeftIcon width={30} height={30} />
            )}
          </div>

          <div className="text-xl font-semibold">{title}</div>
          <div onClick={onClose} className="cursor-pointer">
            <XMarkIcon width={30} height={30} />
          </div>
        </div>
      ) : (
        <div className="flex justify-between border-b p-5 py-5">
          <div onClick={() => setFormStep(2)} className="cursor-pointer">
            <XMarkIcon width={30} height={30} />
          </div>

          <div className="text-xl font-semibold">{title}</div>
          <div />
        </div>
      )}
      <div className={`flex h-full w-full`}>
        <div className="flex h-full w-full">{children}</div>
      </div>
    </Modal>
  );
};

export default CreateProjectLayout;
