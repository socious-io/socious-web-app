import Button from '@components/common/Button/Button';
import Modal from '@components/common/Modal/Modal';
import {twMerge} from 'tailwind-merge';

type StopAssignmentModalProps = {
  state: boolean;
  nextStep: () => void;
  cancel: () => void;
  projectName: string;
};

const StopAssignmentModal = ({
  state,
  nextStep,
  cancel,
  projectName,
}: StopAssignmentModalProps) => {
  return (
    <Modal
      isOpen={state}
      onClose={cancel}
      className="mb-0 max-w-xs pb-0 text-center"
    >
      <Modal.Title>
        <h3 className="font-worksans border-offsetColor py-2 text-xl font-semibold text-error">
          Stop assignement
        </h3>
      </Modal.Title>
      <div className="mx-auto max-w-xs">
        <Modal.Description>
          By stopping the assignement before its completion, you will no longer
          be hired for {projectName}, and you will not get your payment.
        </Modal.Description>
        <div className="space-y-2 pb-4 pt-10">
          <Button
            className={twMerge(
              'mx-auto flex w-full items-center justify-center bg-error align-middle hover:bg-red-500',
            )}
            type="submit"
            variant="fill"
            onClick={nextStep}
          >
            Confirm
          </Button>
          <Button
            className="mx-auto flex w-full items-center justify-center align-middle"
            type="submit"
            onClick={cancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StopAssignmentModal;
