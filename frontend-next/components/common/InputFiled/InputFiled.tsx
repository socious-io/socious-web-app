import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/solid';

export interface InputFiledProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  disabled?: boolean;
  labelFloat?: boolean;
  register?: UseFormRegisterReturn;
  errorMessage?: any;
  suffixContent?: any;
  prefixContent?: any;
}

export const InputFiled = ({
  label = '',
  labelFloat = false,
  type = 'text',
  disabled = false,
  placeholder,
  id,
  name,
  register,
  className,
  errorMessage,
  required,
  suffixContent,
  prefixContent,
  ...props
}: InputFiledProps) => {
  return (
    <div className={twMerge('relative', className && className)}>
      {label && (
        <label
          htmlFor={id || name}
          className={twMerge(
            'block font-base',
            errorMessage ? 'text-error' : 'text-black',
            labelFloat && 'bg-white absolute px-1 left-3 text-sm -top-2',
            disabled && 'text-opacity-40 ',
          )}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      {prefixContent && (
        <span className="absolute left-0 top-12">{prefixContent}</span>
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
          'block w-full py-1.5 text-sm  outline-none',
          errorMessage
            ? 'border-b-2 border-b-error'
            : 'border-b-2 border-b-grayInputField focus:border-b-2 focus:border-b-primary',
          disabled && 'text-opacity-40 border-opacity-40 bg-transparent',
          className && className,
        )}
        {...register}
      />
      {suffixContent && (
        <span className="absolute right-0 top-12">{suffixContent}</span>
      )}

      {errorMessage && (
        <div className="text-error flex items-center">
          {' '}
          <ExclamationCircleIcon className="w-5 h-5 mr-1" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputFiled;
