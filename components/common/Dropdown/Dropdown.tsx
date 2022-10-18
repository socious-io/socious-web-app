import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';

/* eslint-disable-next-line */
export interface DropdownProps {
  display: React.ReactNode;
  children?: React.ReactNode;
  displayClass?: string;
  desktopDropdownClass?: string;
  mobileDropdownClass?: string;
  mobileState?: boolean;
  handleResize?: () => void;
}

export function Dropdown({
  display,
  children,
  displayClass = '',
  desktopDropdownClass = 'absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transform -translate-x-full',
  mobileDropdownClass = 'mobile-menu',
  mobileState,
  handleResize
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className={displayClass}>
        <Menu.Button onClick={handleResize}>{display}</Menu.Button>
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
        <Menu.Items className={mobileState ? mobileDropdownClass : desktopDropdownClass}>{children}</Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
