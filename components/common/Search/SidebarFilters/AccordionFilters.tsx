import {FC, ReactNode} from 'react';
import {Disclosure} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';

interface AccordionFiltersProps {
  title: string;
  content: ReactNode;
}

export const AccordionFilters: FC<AccordionFiltersProps> = ({
  title,
  content,
}) => {
  return (
    <Disclosure defaultOpen>
      {({open}) => (
        <>
          <Disclosure.Button className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-xl font-semibold text-Gray03">{title}</h3>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform transition-transform' : ''
              } h-5 w-5 `}
            />
          </Disclosure.Button>
          <Disclosure.Panel>{content}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
