import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';

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
            'font-base block',
            errorMessage ? 'text-error' : 'text-black',
            labelFloat && 'absolute left-3 -top-2 bg-white px-1 text-sm',
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
          'block w-full rounded-lg border border-grayLineBased py-3 text-sm outline-none',
          errorMessage
            ? ' border-b-error focus:border-b-error'
            : '  focus:border-b-1 focus:border-b-primary',
          disabled && 'border-opacity-40 bg-transparent text-opacity-40',
          className && className,
        )}
        {...register}
      />
      {suffixContent && (
        <span className="absolute right-0 top-12">{suffixContent}</span>
      )}

      {errorMessage && (
        <div className="flex items-center text-error">
          {' '}
          <ExclamationCircleIcon className="mr-1 h-5 w-5" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputFiled;
