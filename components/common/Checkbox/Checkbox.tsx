import * as React from 'react';
import {twMerge} from 'tailwind-merge';
import {UseFormRegisterReturn} from 'react-hook-form';

export interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string | React.ReactNode;
  register?: UseFormRegisterReturn;
  withAlignStart?: boolean;
}

const defaultCheckboxClass =
  'w-4 h-4 mr-2   focus:ring-transparent text-secondary accent-primary hover:accent-primaryLight cursor-pointer';
const disabledClass = 'border-gray-500 bg-gray-400';

export function Checkbox({
  className,
  register,
  disabled = false,
  label = '',
  withAlignStart = false,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`cursor-pointer ${
        withAlignStart ? 'text-center' : 'flex items-center'
      }`}
    >
      {/* <label className="flex items-center cursor-pointer "> */}
      <input
        {...props}
        type="checkbox"
        className={twMerge(
          defaultCheckboxClass,
          disabled && disabledClass,
          className,
        )}
        disabled={disabled}
        {...register}
      />
      {label}
    </label>
  );
}

export default Checkbox;
