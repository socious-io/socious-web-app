import React from 'react';
import {PencilIcon, ShareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Button} from '@components/common';

interface PostOptionProps {
  optionClicked: (data: string) => void;
}

const PostOption = ({optionClicked}: PostOptionProps) => {
  return (
    <div className="border-1 absolute top-6 right-4 w-52 rounded-2xl border-grayLineBased bg-white text-base drop-shadow-lg">
      <Button
        className="flex w-full items-center space-x-3 font-normal text-black"
        variant="link"
        onClick={() => optionClicked('EDIT')}
      >
        <PencilIcon className="w-4" />
        <span>Edit post</span>
      </Button>
      <Button
        className="flex w-full items-center space-x-3 font-normal text-black"
        variant="link"
        onClick={() => optionClicked('SHARE')}
      >
        <ShareIcon className="w-4" />
        <span>Share post</span>
      </Button>
      <Button
        className="flex w-full items-center space-x-3 font-normal text-black"
        variant="link"
        onClick={() => optionClicked('DELETE')}
      >
        <TrashIcon className="w-4" />
        <span>Delete post</span>
      </Button>
    </div>
  );
};

export default PostOption;
