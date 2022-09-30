/* This components is contains options for post that can be
 * access only by authorized owner of the post.
 */

// Packages
import {Fragment} from 'react';
import {twMerge} from 'tailwind-merge';

// Icons
import {PencilIcon, ShareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {EllipsisHorizontalIcon} from '@heroicons/react/24/solid';

//Components
import {Menu, Transition} from '@headlessui/react';
import {Button} from '@components/common';

// Types
type OptionActionType = 'EDIT' | 'SHARE' | 'DELETE';
interface PostOptionProps {
  optionClicked: (data: OptionActionType) => void;
}

type OptionType = {
  action: OptionActionType;
  label: string;
  icon: React.ReactElement;
};

// Options
const options: OptionType[] = [
  {action: 'EDIT', label: 'Edit post', icon: <PencilIcon className="w-4" />},
  {action: 'SHARE', label: 'Share post', icon: <ShareIcon className="w-4" />},
  {action: 'DELETE', label: 'Delete post', icon: <TrashIcon className="w-4" />},
];

const PostOption = ({optionClicked}: PostOptionProps) => {
  return (
    <Menu>
      <Menu.Button as={Fragment}>
        <Button variant="ghost" className="flex border-0 p-2">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </Button>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-60 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-60 opacity-0"
      >
        <Menu.Items className="absolute top-12 right-4 z-10 w-52 overflow-hidden rounded-2xl border border-grayLineBased bg-white text-base drop-shadow-lg">
          {options.map((option) => (
            <Menu.Item as={Fragment} key={option.action}>
              {({active}) => (
                <Button
                  className={twMerge(
                    'flex w-full items-center space-x-3 rounded-none font-normal text-black',
                    active && 'bg-blue-100',
                  )}
                  variant="link"
                  onClick={() => optionClicked(option.action)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </Button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostOption;
