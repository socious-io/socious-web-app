import Modal from '@components/common/Modal/Modal';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/router';
import {FC} from 'react';
import {FieldValues} from 'react-hook-form';
import {LocationForm} from '../TopbarFilters/LocationForm';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: FC<LocationModalProps> = ({isOpen, onClose}) => {
  const route = useRouter();

  const onSubmitLocation = (data: FieldValues) => {
    route.query.country = data.country;
    route.query.city = data.city;
    route.push(route);
    onClose();
  };

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
        <p className="min-h-[30px] text-center text-xl">Location</p>
      </Modal.Title>
      <Modal.Description>
        <LocationForm onSubmit={onSubmitLocation} />
      </Modal.Description>
    </Modal>
  );
};
