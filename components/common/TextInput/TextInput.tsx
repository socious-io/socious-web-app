import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

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
  styleClass?: string;
}

export const TextInput = ({
  label = "",
  labelFloat = false,
  type = "text",
  disabled = false,
  placeholder,
  id,
  name,
  register,
  invalid,
  styleClass,
  ...props
}: TextInputProps) => {
  return (
    <div className={`${labelFloat ? "relative" : ""}`}>
      {label && (
        <label
          htmlFor={id || name}
          className={twMerge(
            "block font-medium",
            invalid ? "text-red-500" : "text-gray-700",
            labelFloat ? "bg-white absolute px-1 left-3 text-sm -top-2" : "",
            disabled ? "text-gray-400" : ""
          )}
        >
          {label}
        </label>
      )}
      <div>
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
            "block w-full py-1.5 text-sm rounded-lg ",
            invalid ? "border-red-500" : "border-gray-300",
            disabled ? "text-gray-400" : "",
            styleClass && styleClass
          )}
          {...register}
        />
      </div>
    </div>
  );
};

export default TextInput;
