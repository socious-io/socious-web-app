import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import React, {useCallback} from 'react';
export interface SearchBarProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  bgColor?: string;
}

export const SearchBar = ({
  type = 'search',
  disabled = false,
  placeholder,
  id,
  name,
  register,
  className,
  bgColor = 'background',
  ...props
}: SearchBarProps) => {
  return (
    <div className={twMerge('relative', className && className)}>
      <span className="absolute left-2 top-2">
        <MagnifyingGlassIcon className="mr-1 h-5 w-5 text-grayDisableButton focus:text-black " />
      </span>

      <input
        {...props}
        disabled={disabled}
        type={type}
        id={id || name}
        name={name || id}
        placeholder={placeholder}
        aria-label={placeholder}
        data-testid={`${id || name}-testid`}
        className={twMerge(
          `border-1 focus:border-1 block w-full rounded-full   border-grayLineBased bg-${bgColor} py-1.5 pl-8 text-sm  outline-none focus:border-primary`,
          disabled && 'border-opacity-40 bg-transparent text-opacity-40',
        )}
        {...register}
      />
    </div>
  );
};

export default SearchBar;
