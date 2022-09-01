import React, {useState, useRef, useCallback} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {SearchIcon} from '@heroicons/react/outline';

export interface SearchBarProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  onChangeText: (text: string) => void;
  defaultValue?: string, 
}

export const SearchBar = ({
  type = 'search',
  disabled = false,
  defaultValue = "",
  placeholder,
  id,
  name,
  register,
  className,
  onChangeText,
  ...props
}: SearchBarProps) => {

  const onInputChange = useCallback((e) => {
    if (e?.currentTarget?.value !== undefined) {
      onChangeText(e?.currentTarget?.value || "");
    }
  }, [onChangeText])
  
  return (
    <div className={twMerge('relative', className && className)}>
      <span className="absolute left-2 top-2">
        <SearchIcon className="w-5 h-5 mr-1 text-grayDisableButton focus:text-black " />
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
          'block w-full py-1.5 text-sm rounded-full   pl-8 bg-background outline-none border-2 border-grayLineBased  focus:border-2 focus:border-primary',
          disabled && 'text-opacity-40 border-opacity-40 bg-transparent',
        )}
        onChange={onInputChange}
        {...register}
      />
    </div>
  );
};

export default SearchBar;
