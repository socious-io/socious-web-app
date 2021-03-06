import * as React from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegisterReturn } from "react-hook-form";

export interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  register?: UseFormRegisterReturn;
}

const defaultCheckboxClass =
  "w-4 h-4 mr-2  focus:ring-transparent text-secondary accent-primary hover:accent-primaryLight";
const disabledClass = "border-gray-500 bg-gray-400";

export function Checkbox({
  className,
  register,
  disabled = false,
  label = "",
  ...props
}: CheckboxProps) {
  return (
    <label className="flex items-center">
      <input
        {...props}
        type="checkbox"
        className={twMerge(
          defaultCheckboxClass,
          disabled && disabledClass,
          className
        )}
        disabled={disabled}
        {...register}
      />
      {label}
    </label>
  );
}

export default Checkbox;
