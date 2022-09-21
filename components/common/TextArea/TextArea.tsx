import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
export interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
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

export const TextArea = ({
  label = '',
  labelFloat = false,
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
}: TextAreaProps) => {
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
            'sm:text-sm text-base font-semibold block',
            errorMessage ? 'text-error' : 'text-black',
            labelFloat ? 'absolute left-3 -top-2 bg-white px-1 text-sm' : '',
            disabled && 'text-opacity-40 ',
          )}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <textarea
        {...props}
        disabled={disabled}
        id={id || name}
        name={name || id}
        placeholder={placeholder || label}
        aria-label={label}
        data-testid={`${label}-testid`}
        className={twMerge(
          'block w-full rounded-lg py-1.5 px-2 border border-grayLineBased sm:text-sm text-base outline-none',
          errorMessage
            ? 'border-1 border-b-error'
            : ' border-1  focus:border-1 focus:border-primary',
          disabled && 'border-opacity-40 bg-transparent text-opacity-40',
          className && className,
        )}
        {...register}
      />

      {errorMessage && (
        <div className="flex items-center text-error">
          {' '}
          <ExclamationCircleIcon className="mr-1 h-5 w-5" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextArea;
