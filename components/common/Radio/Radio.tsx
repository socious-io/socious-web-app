import {UseFormRegisterReturn} from 'react-hook-form';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
/* eslint-disable-next-line */
export interface RadioInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name?: string;
  id?: string;
  checked?: boolean;
  register?: UseFormRegisterReturn;
  errorMessage?: any;
}

export function Radio({
  label,
  id,
  register,
  errorMessage,
  ...props
}: RadioInputProps) {
  return (
    <>
      <label className="flex cursor-pointer items-center align-middle">
        <div className="mr-2 ">
          <input
            {...props}
            type="radio"
            className="h-4 w-4 rounded-full text-white accent-primary checked:border-graySubtitle focus:ring-transparent"
            id={id}
            {...register}
          />
        </div>
        <div>{label}</div>
      </label>
      {errorMessage && (
        <div className="flex items-center text-error">
          <ExclamationCircleIcon className="mr-1 h-5 w-5" /> {errorMessage}
        </div>
      )}
    </>
  );
}

export default Radio;
