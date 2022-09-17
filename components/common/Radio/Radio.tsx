import {UseFormRegisterReturn} from 'react-hook-form';
import {ExclamationCircleIcon} from '@heroicons/react/solid';
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
      <label className="flex items-center cursor-pointer align-middle">
        <div className="mr-2 ">
          <input
            {...props}
            type="radio"
            className="w-4 h-4  text-orange-500 rounded-full focus:ring-transparent accent-primary"
            id={id}
            {...register}
          />
        </div>
        <div>{label}</div>
      </label>
      {errorMessage && (
        <div className="text-error flex items-center">
          <ExclamationCircleIcon className="w-5 h-5 mr-1" /> {errorMessage}
        </div>
      )}
    </>
  );
}

export default Radio;
