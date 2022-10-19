import * as React from 'react';
import {Menu, Transition} from '@headlessui/react';
import {twMerge} from 'tailwind-merge';

/* eslint-disable-next-line */
export interface DropdownProps {
  display: React.ReactNode;
  children?: React.ReactNode;
  displayClass?: string;
  dropdownClass?: string;
}

export function Dropdown({
  display,
  children,
  displayClass = '',
  dropdownClass = '',
}: DropdownProps) {
  const _dropdownClass = twMerge(
    'absolute overflow-hidden mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10',
    dropdownClass,
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className={displayClass}>
        <Menu.Button>{display}</Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={_dropdownClass}>{children}</Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
