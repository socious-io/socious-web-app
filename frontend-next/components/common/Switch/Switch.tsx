import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { Switch as SwitchRoot } from "@headlessui/react";

export interface InputToggleProps {
  onChange: (value: boolean) => void;
  value?: boolean;
  label?: string;
}

export function Switch({ onChange, value = false, label }: InputToggleProps) {
  return (
    <SwitchRoot
      checked={value}
      onChange={onChange}
      className={`${
        value ? "bg-gray-500" : "bg-gray-200"
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`${
          value ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </SwitchRoot>
  );
}

export default Switch;
