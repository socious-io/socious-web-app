import Button from '@components/common/Button/Button';
import Modal from '@components/common/Modal/Modal';
import {twMerge} from 'tailwind-merge';

// Types
type ConfirmApplicantActionModalProps = {
  state: boolean;
  title: string;
  description: string;
  nextStep: () => void;
  continueText: string;
  cancel: () => void;
};

const ConfirmApplicantActionModal = ({
  state,
  title,
  description,
  nextStep,
  continueText,
  cancel,
}: ConfirmApplicantActionModalProps) => {
  return (
    <Modal
      isOpen={state}
      onClose={cancel}
      className="mb-0 max-w-xs pb-0 text-center"
    >
      <Modal.Title>
        <h3
          className={twMerge(
            'font-worksans border-offsetColor py-2 text-xl font-semibold',
            continueText === 'Reject' && 'text-error',
          )}
        >
          {title}
        </h3>
      </Modal.Title>
      <div className="mx-auto max-w-xs px-2">
        <Modal.Description>{description}</Modal.Description>
        <div className="space-y-2 pb-4 pt-10">
          <Button
            className={twMerge(
              'mx-auto flex w-full items-center justify-center align-middle',
              continueText === 'Reject' && 'bg-error hover:bg-red-500',
            )}
            type="submit"
            variant="fill"
            value="Submit"
            onClick={nextStep}
          >
            {continueText}
          </Button>
          <Button
            className="mx-auto flex items-center justify-center align-middle"
            type="submit"
            variant="ghost"
            value="Submit"
            onClick={cancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmApplicantActionModal;
