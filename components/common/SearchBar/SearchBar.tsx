import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

export interface SearchBarProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  disabled?: boolean;
  register?: UseFormRegisterReturn;
}

export const SearchBar = ({
  type = 'search',
  disabled = false,
  placeholder,
  id,
  name,
  register,
  className,
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
          'block w-full rounded-full border-2 border-grayLineBased   bg-background py-1.5 pl-8 text-sm outline-none  focus:border-2 focus:border-primary',
          disabled && 'border-opacity-40 bg-transparent text-opacity-40',
        )}
        {...register}
      />
    </div>
  );
};

export default SearchBar;
