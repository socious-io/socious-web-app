/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment, useEffect, useState} from 'react';
import {Combobox as UiCombobox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronDownIcon} from '@heroicons/react/solid';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/solid';
import useDebounce from 'hooks/useDebounce';
import { ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface ComboboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string | ReactElement;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  errorMessage?: any;
  suffixContent?: any;
  prefixContent?: any;
  selected?: any;
  onSelected?: (value: any) => void;
  onChangeInputSearch?: (value: any) => void;
  items: Array<any>;
}

export default function Combobox({
  label = '',
  disabled = false,
  items,
  id,
  name,
  className,
  errorMessage,
  required,
  selected,
  register,
  onSelected,
  onChangeInputSearch,
  ...props
}: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const debouncedAmount = useDebounce(query, 500);

  useEffect(() => {
    onChangeInputSearch && onChangeInputSearch(debouncedAmount);
  }, [debouncedAmount]);

  
  useEffect(() => {
    query === ''
        ? setFilteredItems(items)
        : setFilteredItems(() => items.filter((person) =>
              person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')),
          ))
  }, [filteredItems, query])

  return (
    <UiCombobox
      value={selected}
      onChange={(item) => {
        onSelected && onSelected(item);
      }}
      name={name}
      disabled={disabled}
    >
      {({open}) => (
        <div className={twMerge('relative mt-1', className && className)}>
          {label && (
            <UiCombobox.Label
              htmlFor={id || name}
              className={twMerge(
                'block font-base',
                errorMessage ? 'text-error' : 'text-black',
                disabled && 'text-opacity-40 ',
              )}
            >
              <div className='flex items-baseline'>
                {label} {required && <span className="text-error">*</span>}
              </div>
            </UiCombobox.Label>
          )}
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <UiCombobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
              displayValue={(item: any) => item?.name}
              onChange={(event) => setQuery(event.target.value)}
              // required={required}
              {...props}
              {...register}
            />

            <UiCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </UiCombobox.Button>
          </div>
          <Transition
            as={Fragment}
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            afterLeave={() => setQuery('')}
          >
            <UiCombobox.Options className="z-10 absolute top-full right-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <UiCombobox.Option
                    key={item.id}
                    className={({active, selected}) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active || selected
                          ? 'bg-offWhite text-gray-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({selected, active}) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-gray-700' : 'text-gray-700'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </UiCombobox.Option>
                ))
              )}
            </UiCombobox.Options>
          </Transition>
          {errorMessage && (
            <div className="text-error flex items-center">
              <ExclamationCircleIcon className="w-5 h-5 mr-1" /> {errorMessage}
            </div>
          )}
        </div>
      )}
    </UiCombobox>
  );
}
