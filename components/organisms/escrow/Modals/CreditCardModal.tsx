import {Modal} from '@components/common';
import React, {useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
// Icons
import {ChevronLeftIcon, XMarkIcon} from '@heroicons/react/24/solid';
import AddModal from './AddModal';
import SuccessModal from './SuccessModal';
import {joiResolver} from '@hookform/resolvers/joi';
import {creditCardSchema} from '@api/organizations/validation';

const CreditCardModal = ({
  closeModal,
  openState,
}: {
  closeModal: () => void;
  openState: boolean;
}) => {
  const [modalState, setState] = useState<number>(1);

  const onForceClose = useCallback(() => {
    setState(1);
    // formMethods.reset();
    closeModal();
  }, [closeModal]);

  const goBack = useCallback(
    () => (modalState === 1 ? onForceClose() : setState((state) => state - 1)),
    [modalState, onForceClose],
  );

  const onSubmit = useCallback(() => {
    console.log('SUBMIT');
    setState((state) => state + 1);
  }, []);

  const formMethods = useForm({
    resolver: joiResolver(creditCardSchema),
  });

  return (
    <Modal
      // isOpen={true}
      isOpen={openState}
      onClose={onForceClose}
      className={twMerge(
        '-m-4 flex h-screen w-screen flex-col rounded-none p-0 pt-14 sm:m-0 sm:max-h-[45rem] sm:w-full sm:max-w-md sm:rounded-2xl sm:pt-0',
      )}
    >
      <div className="sticky top-0">
        <Modal.Title>
          <h3 className="font-worksans border-b-2 pt-6 pb-2 text-center text-xl font-semibold">
            Add credit card
          </h3>
        </Modal.Title>
        {/* Arrow Button */}
        <span className="absolute top-6 left-3" onClick={goBack}>
          <ChevronLeftIcon className="w-6" />
        </span>
        {/* Cross */}
        <span
          className="absolute top-6 right-3 hidden cursor-pointer sm:block"
          onClick={() => onForceClose()}
        >
          <XMarkIcon className="w-6" />
        </span>
      </div>
      <FormProvider {...formMethods}>
        {[1, 2].includes(modalState) && (
          <AddModal submit={onSubmit} review={modalState === 2} />
        )}

        {modalState === 3 && <SuccessModal submit={onSubmit} />}
      </FormProvider>
    </Modal>
  );
};

export default CreditCardModal;
