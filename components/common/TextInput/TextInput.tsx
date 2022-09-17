import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
export interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  disabled?: boolean;
  labelFloat?: boolean;
  register?: UseFormRegisterReturn;
  invalid?: boolean;
  className?: string;
  containerClassName?: string;
  errorMessage?: any;
}

export const TextInput = ({
  label = '',
  labelFloat = false,
  type = 'text',
  disabled = false,
  placeholder,
  id,
  name,
  register,
  invalid,
  className,
  containerClassName,
  errorMessage,
  required,
  ...props
}: TextInputProps) => {
  return (
    <div
      className={`${labelFloat ? 'relative' : ''} ${
        containerClassName && containerClassName
      }`}
    >
      {label && (
        <label
          htmlFor={id || name}
          className={twMerge(
            'block font-base',
            errorMessage ? 'text-error' : 'text-black',
            labelFloat ? 'bg-white absolute px-1 left-3 text-sm -top-2' : '',
            disabled && 'text-opacity-40 ',
          )}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <input
        {...props}
        disabled={disabled}
        type={type}
        id={id || name}
        name={name || id}
        placeholder={placeholder || label}
        aria-label={label}
        data-testid={`${label}-testid`}
        className={twMerge(
          'block w-full py-1.5 px-2 text-sm  outline-none rounded-lg',
          errorMessage
            ? 'border-2 border-b-error'
            : ' border-2 border-background focus:border-2 focus:border-primary',
          disabled && 'text-opacity-40 border-opacity-40 bg-transparent',
          className && className,
        )}
        {...register}
      />

      {errorMessage && (
        <div className="text-error flex items-center">
          {' '}
          <ExclamationCircleIcon className="w-5 h-5 mr-1" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextInput;
