import * as React from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { twMerge } from "tailwind-merge";

export interface ModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface IModalCloseButton {
  onClose?: () => void;
}

export function Modal({
  isOpen = false,
  onClose = () => null,
  className,
  children,
}: ModalProps) {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={onClose}
      open={isOpen}
    >
      <div className="min-h-screen text-center md:px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div
          className={twMerge(
            "inline-block w-full overflow-hidden text-left align-middle bg-white rounded shadow-xl md:my-8 transition-all transform max-w-max",
            className
          )}
        >
          {children}
        </div>
      </div>
    </Dialog>
  );
}

const Title = ({ children }: ModalProps) => {
  return (
    <Dialog.Title
      as="h3"
      className="text-2xl font-bold leading-6 text-center text-gray-900 lg:text-3xl"
    >
      {children}
    </Dialog.Title>
  );
};

const CloseButton = ({ onClose }: IModalCloseButton) => {
  return (
    <XIcon
      className="absolute w-6 h-6 text-black cursor-pointer top-8 right-4 lg:right-8"
      onClick={onClose}
    />
  );
};

Modal.Title = Title;
Modal.CloseButton = CloseButton;

export default Modal;
