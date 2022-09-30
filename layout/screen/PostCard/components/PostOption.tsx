import React from 'react';
import {PencilIcon, ShareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Button} from '@components/common';
import {Menu, Transition} from '@headlessui/react';
import {EllipsisHorizontalIcon} from '@heroicons/react/24/solid';
import {twMerge} from 'tailwind-merge';

interface PostOptionProps {
  optionClicked: (data: 'EDIT' | 'SHARE' | 'DELETE') => void;
}

const PostOption = ({optionClicked}: PostOptionProps) => {
  return (
    <Menu>
      <Menu.Button as={React.Fragment}>
        <Button variant="ghost" className="flex border-0 p-2">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </Button>
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-60 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-60 opacity-0"
      >
        <Menu.Items className="absolute top-12 right-4 z-10 w-52 overflow-hidden rounded-2xl border border-grayLineBased bg-white text-base drop-shadow-lg">
          <Menu.Item>
            {({active}) => (
              <Button
                className={twMerge(
                  'flex w-full items-center space-x-3 rounded-none font-normal text-black',
                  active && 'bg-blue-100',
                )}
                variant="link"
                onClick={() => optionClicked('EDIT')}
              >
                <PencilIcon className="w-4" />
                <span>Edit post</span>
              </Button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({active}) => (
              <Button
                // className="flex w-full items-center space-x-3 font-normal text-black"
                className={twMerge(
                  'flex w-full items-center space-x-3 rounded-none font-normal text-black',
                  active && 'bg-blue-100',
                )}
                variant="link"
                onClick={() => optionClicked('SHARE')}
              >
                <ShareIcon className="w-4" />
                <span>Share post</span>
              </Button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({active}) => (
              <Button
                // className="flex w-full items-center space-x-3 font-normal text-black"
                className={twMerge(
                  'flex w-full items-center space-x-3 rounded-none font-normal text-black',
                  active && 'bg-blue-100',
                )}
                variant="link"
                onClick={() => optionClicked('DELETE')}
              >
                <TrashIcon className="w-4" />
                <span>Delete post</span>
              </Button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostOption;
