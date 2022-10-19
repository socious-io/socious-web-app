import {
  ExclamationCircleIcon,
  XMarkIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import {CheckCircleIcon} from '@heroicons/react/24/solid';
import Router from 'next/router';
import {twMerge} from 'tailwind-merge';

interface VariantSubValues {
  position: string;
  bg: string;
  border: string;
  bgIcon: string;
  icon: React.ReactNode;
  textColor: string;
  XMarkIconColor: string;
}
interface VariantValues {
  [key: string]: VariantSubValues;
}

const VARIANT: VariantValues = {
  success: {
    position: 'bottom-10',
    bg: 'bg-success-100',
    border: 'border-success',
    bgIcon: '',
    icon: <CheckCircleIcon className="h-6 w-6 text-success" />,
    textColor: 'text-black',
    XMarkIconColor: 'text-black',
  },
  error: {
    position: 'top-10',
    bg: 'bg-error-100',
    border: 'bg-error-100',
    bgIcon: 'bg-error',
    icon: <ExclamationCircleIcon className="h-6 w-6 text-white" />,
    textColor: 'text-tart-orange-700',
    XMarkIconColor: 'text-error',
  },
  copySuccess: {
    position: 'z-20 top-16 px-4 w-auto left-auto right-1/2 translate-x-2/4',
    bg: ' bg-success py-0 w-80 rounded-2xl',
    border: 'border-none drop-shadow-md',
    bgIcon: '',
    icon: <LinkIcon className="h-6 w-6 text-background" />,
    textColor: 'text-background',
    XMarkIconColor: 'text-background',
  },
};

export interface ToastProps {
  text: string;
  body?: string;
  isOpen?: boolean;
  link?: string;
  onClose?: () => void;
  variant?: 'error' | 'success' | 'copySuccess';
}

export function Toast({
  text,
  body,
  link,
  onClose,
  isOpen = false,
  variant = 'error',
}: ToastProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={twMerge(
        `fixed left-0 right-0 z-10`,
        VARIANT[variant].position,
      )}
      onClick={() => {
        link && Router.push(link);
        onClose && onClose();
      }}
    >
      <div className="container mx-auto px-3">
        <div
          className={`flex items-center justify-between rounded-lg border p-3 ${VARIANT[variant].border} ${VARIANT[variant].bg}`}
        >
          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${VARIANT[variant].bgIcon}`}
            >
              <i>{VARIANT[variant].icon}</i>
            </div>
            <div className="space-y-1 px-3 py-2">
              <p className={`font-medium ${VARIANT[variant].textColor}`}>
                {text}
              </p>
              {body && (
                <p className={`${VARIANT[variant].textColor}`}>{body}</p>
              )}
            </div>
          </div>
          {onClose && (
            <button className="px-2" onClick={onClose}>
              <XMarkIcon
                className={`h-7 w-7 ${VARIANT[variant].XMarkIconColor}`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Toast;
