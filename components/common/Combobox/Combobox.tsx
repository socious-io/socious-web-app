/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment, useEffect, useState} from 'react';
import {Combobox as UiCombobox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronDownIcon} from '@heroicons/react/24/solid';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';
import useDebounce from 'hooks/useDebounce';
import {ReactElement} from 'react';
import {UseControllerReturn} from 'react-hook-form';

export type ComboBoxSelectionType = {
  id: string;
  name: string;
};

export interface ComboboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string | ReactElement;
  disabled?: boolean;
  controller?: UseControllerReturn;
  errorMessage?: any;
  suffixContent?: any;
  prefixContent?: any;
  selected?: any;
  onSelected?: (value: any) => void;
  onChangeInputSearch?: (value: any) => void;
  items: Array<ComboBoxSelectionType | any>;
}

export function Combobox({
  label = '',
  disabled = false,
  items,
  id,
  name,
  className,
  errorMessage,
  required,
  selected,
  controller,
  onSelected,
  onChangeInputSearch,
  ...props
}: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const debouncedAmount = useDebounce(query, 500);

  if (!name && controller?.field.name) name = controller.field.name;
  if (controller) errorMessage = controller.fieldState.error?.message;
  if (controller?.field.value && !controller.fieldState.isDirty)
    selected = items.find((item) => item.id === controller.field.value) || '';

  useEffect(() => {
    onChangeInputSearch && onChangeInputSearch(debouncedAmount);
  }, [debouncedAmount]);

  useEffect(() => {
    query === ''
      ? setFilteredItems(items)
      : setFilteredItems(() =>
          items.filter((person) =>
            person.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          ),
        );
  }, [filteredItems, query, items]);

  return (
    <UiCombobox
      value={selected}
      onChange={(item) => {
        onSelected && onSelected(item);
        controller && controller.field.onChange(item.id);
      }}
      name={name}
      disabled={disabled}
    >
      {({open}) => (
        <div className={twMerge('relative', className && className)}>
          {label && (
            <UiCombobox.Label
              htmlFor={id || name}
              className={twMerge(
                'text-base font-semibold sm:text-sm',
                errorMessage ? 'text-error' : 'text-black',
                disabled && 'text-opacity-40 ',
              )}
            >
              <div className="mb-3 flex items-baseline text-sm font-medium">
                {label} {required && <span className="text-error">*</span>}
              </div>
            </UiCombobox.Label>
          )}
          <div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <UiCombobox.Input
              name={`${name}-input`}
              className="w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0"
              displayValue={(item: any) => item?.name}
              onChange={(event) => setQuery(event.target.value)}
              // required={required}
              {...props}
              ref={controller?.field.ref}
              onBlur={controller?.field.onBlur}
            />

            <UiCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </UiCombobox.Button>
          </div>
          {items.length !== 0 && (
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
              <UiCombobox.Options className="absolute top-full right-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </UiCombobox.Option>
                  ))
                )}
              </UiCombobox.Options>
            </Transition>
          )}
          {errorMessage && (
            <div className="flex items-center text-error">
              <ExclamationCircleIcon className="mr-1 h-5 w-5" /> {errorMessage}
            </div>
          )}
        </div>
      )}
    </UiCombobox>
  );
}

export default Combobox;
