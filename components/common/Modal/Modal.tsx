import * as React from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {Fragment} from 'react';
import {twMerge} from 'tailwind-merge';

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export interface IModalCloseButton {
  onClose?: () => void;
}

export function Modal({
  isOpen = false,
  onClose = () => null,
  children,
  className,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                  className && className,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

const Title = ({children}: ModalProps) => {
  return (
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      {children}
    </Dialog.Title>
  );
};
const Description = ({children}: ModalProps) => {
  return <Dialog.Description>{children}</Dialog.Description>;
};

const CloseButton = ({onClose}: IModalCloseButton) => {
  return (
    <XMarkIcon
      className="absolute top-8 right-4 h-6 w-6 cursor-pointer text-black lg:right-8"
      onClick={onClose}
    />
  );
};

Modal.Title = Title;
Modal.Description = Description;
Modal.CloseButton = CloseButton;

export default Modal;
