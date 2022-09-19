import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import {Switch as SwitchRoot} from '@headlessui/react';

export interface InputToggleProps {
  onChange: (value: boolean) => void;
  value?: boolean;
  label?: string;
}

export function Switch({onChange, value = false, label}: InputToggleProps) {
  return (
    <SwitchRoot
      checked={value}
      onChange={onChange}
      className={`${
        value ? 'bg-gray-500' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`${
          value ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white`}
      />
    </SwitchRoot>
  );
}

export default Switch;
