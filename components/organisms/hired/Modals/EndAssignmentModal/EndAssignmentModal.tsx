import Button from '@components/common/Button/Button';
import Modal from '@components/common/Modal/Modal';

// Types
export type EndAssignmentModalProps = {
  setAction: React.Dispatch<
    React.SetStateAction<'OPEN' | 'COMPLETED' | 'STOP' | null>
  >;
  state: boolean;
};

const EndAssignmentModal = ({setAction, state}: EndAssignmentModalProps) => {
  return (
    <Modal
      isOpen={state}
      onClose={() => setAction(null)}
      className="mb-0 max-w-xs pb-0 text-center"
    >
      <Modal.Title>
        <h3 className="font-worksans border-offsetColor py-2 text-xl font-semibold">
          End assignment
        </h3>
      </Modal.Title>
      <div className="mx-auto max-w-xs">
        <div className="space-y-2 pb-4 pt-6">
          <Button
            className="mx-auto flex w-full items-center justify-center align-middle"
            type="submit"
            variant="fill"
            value="Submit"
            onClick={() => setAction('COMPLETED')}
          >
            Completed
          </Button>
          <Button
            className="mx-auto flex w-full items-center justify-center align-middle"
            type="submit"
            variant="outline"
            value="Submit"
            onClick={() => setAction('STOP')}
          >
            Stop assignment
          </Button>
          <Button
            className="mx-auto flex items-center justify-center align-middle"
            type="submit"
            variant="ghost"
            value="Submit"
            onClick={() => setAction(null)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EndAssignmentModal;
