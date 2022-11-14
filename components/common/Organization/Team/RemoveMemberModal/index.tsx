import {removeMember} from '@api/organizations/actions';
import Button from '@components/common/Button/Button';
import Modal from '@components/common/Modal/Modal';
import {UserProfile} from '@models/profile';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import useSWR from 'swr';
import {get} from 'utils/request';

type RemoveMemberModalProps = {
  username: string;
  onClose: () => void;
  orgId: string;
  onRemove: () => void;
};
const RemoveMemberModal = ({
  username,
  onClose,
  onRemove,
  orgId,
}: RemoveMemberModalProps) => {
  const [state, setState] = useState<number>(1);
  const {data} = useSWR<UserProfile>(
    `/user/by-username/${username}/profile`,
    get,
  );

  const handleRemove = async () => {
    if (data) {
      try {
        await removeMember(orgId, data.id);
        onRemove();
        setState(2);
      } catch (error: any) {
        if (error.isAxiosError && error.response?.data)
          toast.error(`Error: ${error.response.data}`);
      }
    }
  };
  return (
    <Modal isOpen={!!username} onClose={onClose} className="px-6 pb-5 pt-8">
      {state === 1 ? (
        <div className="space-y-4">
          <h1 className="text-center text-xl font-semibold text-error">
            Are you sure?
          </h1>
          <p>
            {data
              ? `If you continue ${data.first_name} ${data.last_name} will no longer be a member of this organization.`
              : ''}
          </p>
          <div className="mt-3 space-y-2">
            <Button
              className="flex w-full justify-center"
              onClick={handleRemove}
            >
              Yes, I’m sure
            </Button>
            <Button
              variant="outline"
              className="flex w-full justify-center"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <p>
            You have successfully removed {data?.first_name} {data?.last_name}{' '}
            from this organization.
          </p>
          <div>
            <Button className="flex w-full justify-center" onClick={onClose}>
              Ok
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RemoveMemberModal;
