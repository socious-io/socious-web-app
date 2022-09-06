import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import {XIcon} from '@heroicons/react/solid';

export interface ToastProps {
  success: boolean;
  shopName: string;
  message?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export function Toast({
  success,
  shopName,
  message = '',
  isVisible = true,
  onClose = () => null,
}: ToastProps) {
  const backgroundColor = success ? 'bg-success-100' : 'bg-error-100';
  const renderIcon = () =>
    success ? (
      <CheckCircleIcon className="w-6 h-6 text-success" />
    ) : (
      <XCircleIcon className="w-6 h-6 text-error" />
    );

  return (
    <div
      className={`${
        isVisible ? 'absolute' : 'hidden'
      } top-10 right-10 w-96 p-4 flex space-x-4 rounded-lg shadow ${backgroundColor}`}
    >
      {renderIcon()}
      <div className="flex justify-between flex-grow space-x-4">
        <div>
          <p>
            <strong>{shopName}</strong>{' '}
            {message.length ? message : 'has been added.'}
          </p>
        </div>
        <XIcon
          className="w-6 h-6 text-gray-500 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Toast;
