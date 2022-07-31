import * as React from "react";
import { twMerge } from "tailwind-merge";

/* eslint-disable-next-line */
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "fill" | "outline" | "ghost" | "link" | "simple" | "filter";
  size?: "lg" | "md" | "sm";
}

const defaultBtnClass =
  "inline-flex items-center font-medium rounded-3xl border text-base";

const variantClass = {
  fill:
    "bg-primary border-transparent text-white hover:bg-primaryDark  focus:bg-primaryDark   focus:shadow-md ",
  outline:
    "bg-white border-grayLineBased text-primary hover:bg-primaryLight hover:border-transparent focus:bg-primaryLight focus:border-transparent focus:shadow-md",
  ghost:
    "bg-transparent border-transparent text-primary hover:text-orange-600 focus:text-orange-600 focus:bg-orange-100",
  link:
    "bg-transparent border-transparent text-primary hover:text-orange-600 focus:text-orange-600 focus:underline",
  simple:
    "bg-white border border-gray-400 text-black hover:bg-gray-400 focus:bg-gray-400 hover:text-black focus:text-black",
  filter: "bg-gray-300 text-gray-900 font-medium",
};

const disableClass = {
  fill: "disabled:bg-opacity-40 disabled:text-opacity-40 disabled:cursor-not-allowed",
  outline: "disabled:bg-white disabled:bg-opacity-40 disabled:text-opacity-40 disabled:border-grayLineBased disabled:cursor-not-allowed ",
  ghost: "text-gray-400 pointer-events-none",
  link: "text-gray-400 pointer-events-none",
  simple: "border-gray-400 text-gray-400 pointer-events-none",
  filter: "bg-gray-300 text-gray-400 font-medium",
};

const sizeClass = {
  lg: "px-6 py-3",
  md: "px-4 py-2",
  sm: "px-3 py-2 leading-4 text-sm",
};

export function Button({
  children = "Button",
  disabled = false,
  type = "button",
  variant = "fill",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={twMerge(
        defaultBtnClass,
        variant && variantClass[variant],
        size && sizeClass[size],
        disabled && disableClass[variant],
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
