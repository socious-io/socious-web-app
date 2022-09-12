
import { ModalProps, Modal, Button } from "@components/common";

const DeleteModal = ({
  isOpen = true,
  onClose = () => null,
}: ModalProps) => {

  return (
    <Modal isOpen={isOpen} className="max-w-xs" onClose={onClose}>
      <Modal.Description>
        <div className="mt-2">
          <p className="text-sm font-normal text-center text-base">Are you sure you want to delete this post? This action is irreversible.</p>
        </div>
      </Modal.Description>
      <div className="space-y-2 mt-7">
        <Button
          className="max-w-full block mx-auto w-full align-middle font-semibold"
          variant="fill"
          >
          Delete
        </Button>
        <Button
          className="max-w-full block mx-auto align-middle font-semibold"
          type="submit"
          variant="ghost"
          onClick={onClose}
          >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;