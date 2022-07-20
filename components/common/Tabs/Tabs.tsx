import * as React from "react";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

/* eslint-disable-next-line */
export interface TabsProps {
  variant?: "card" | "button";
  tabs: {
    title: string;
    render: () => React.ReactNode;
  }[];
}

const listClass = {
  card: "space-x-1.5",
  button: "space-x-3 p-6",
};

const variantClass = {
  card:
    "w-32 min-w-max px-10 h-12 bg-gray-300 text-gray-600 flex items-center justify-center rounded-t-lg cursor-pointer",
  button:
    "text-gray-600 py-2 px-3 border border-solid border-gray-300 rounded-md text-sm bg-neutral-white cursor-pointer",
};

const SelectedClass = {
  card: "bg-white text-primary font-semibold",
  button: "text-primary font-semibold bg-orange-100 border-orange-200",
};

export function Tabs({ variant = "card", tabs = [] }: TabsProps) {
  return (
    <div>
      <Tab.Group>
        <Tab.List className={twMerge("flex items-center", listClass[variant])}>
          {tabs.map((tab) => (
            <Tab
              key={tab.title}
              className={({ selected }) =>
                twMerge(
                  variantClass[variant],
                  selected && SelectedClass[variant]
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.title}>{tab.render()}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Tabs;
