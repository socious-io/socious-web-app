import Modal from '@components/common/Modal/Modal';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {FC} from 'react';
import {SkillsForm} from './SkillsForm';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsModal: FC<SkillsModalProps> = ({isOpen, onClose}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="-m-4 h-screen w-screen rounded-none p-0 sm:m-0 sm:h-auto sm:rounded-2xl"
    >
      <div className="p-3">
        <span className="absolute right-3 cursor-pointer " onClick={onClose}>
          <XMarkIcon className="w-6" />
        </span>
      </div>
      <Modal.Title>
        <p className="min-h-[30px] text-center text-xl">Skills</p>
      </Modal.Title>
      <Modal.Description>
        <SkillsForm onSubmit={onClose} />
      </Modal.Description>
    </Modal>
  );
};
