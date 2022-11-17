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
  inputType?: 'borderBottom';
}

const inputTypeOptions = {
  borderBottom:
    'border-0 rounded-none border-b-2 focus:shadow-none focus:ring-offset-0 focus:ring-0',
};

export const InputFiled = React.forwardRef<HTMLInputElement, InputFiledProps>(
  (
    {
      label = '',
      labelFloat = false,
      type = 'text',
      disabled = false,
      placeholder,
      id,
      inputType,
      name,
      register,
      className,
      errorMessage,
      required,
      suffixContent,
      prefixContent,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={twMerge('relative', className && className)}>
        {label && (
          <label
            htmlFor={id || name}
            className={twMerge(
              'block text-base font-semibold sm:text-sm',
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
          ref={ref}
          disabled={disabled}
          type={type}
          id={id || name}
          name={name || register?.name || id}
          placeholder={placeholder || label}
          aria-label={label}
          data-testid={`${label}-testid`}
          className={twMerge(
            'block w-full rounded-lg border border-grayLineBased py-3 text-base outline-none sm:text-sm',
            errorMessage
              ? ' border-b-error focus:border-b-error'
              : '  focus:border-b-1 focus:border-b-primary',
            disabled && 'border-opacity-40 bg-transparent text-opacity-40',
            className && className,
            inputType && inputTypeOptions[inputType],
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
  },
);

InputFiled.displayName = 'InputFiled';

export default InputFiled;
