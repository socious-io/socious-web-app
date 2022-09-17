import {deletePost} from '@api/posts/actions';
import {ModalProps, Modal, Button} from '@components/common';
import {useCallback} from 'react';
import Router from 'next/router';
interface DeleteModalProps extends ModalProps {
  pid: string;
}

const DeleteModal = ({
  isOpen = true,
  onClose = () => null,
  pid,
}: DeleteModalProps) => {
  const onDelete = useCallback(async () => {
    try {
      await deletePost(pid);
      console.log('Deleted');
      Router.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [pid]);

  return (
    <Modal isOpen={isOpen} className="max-w-xs" onClose={onClose}>
      <Modal.Description>
        <div className="mt-2">
          <p className="text-center text-sm text-base font-normal">
            Are you sure you want to delete this post? This action is
            irreversible.
          </p>
        </div>
      </Modal.Description>
      <div className="mt-7 space-y-2">
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          variant="fill"
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
