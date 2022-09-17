import React from 'react';
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@components/common';

interface PostOptionProps {
  optionClicked: (data: string) => void;
}

const PostOption = ({
  optionClicked
}: PostOptionProps) => {
  return (
    <div className='absolute top-6 right-4 bg-white rounded-2xl drop-shadow-lg border-1 border-grayLineBased w-52 text-base'>
      <Button 
        className='flex items-center space-x-3 w-full font-normal text-black'
        variant='link'
        onClick={() => optionClicked("EDIT")}
        >
        <PencilIcon className='w-4' />
        <span>
          Edit post
        </span>
      </Button>
      <Button 
        className='flex items-center space-x-3 w-full font-normal text-black'
        variant='link'
        onClick={() => optionClicked("SHARE")}
        >
        <ShareIcon className='w-4' />
        <span>
          Share post
        </span>
      </Button>
      <Button 
        className='flex items-center space-x-3 w-full font-normal text-black'
        variant='link'
        onClick={() => optionClicked("DELETE")}
      >
        <TrashIcon className='w-4' />
        <span>
          Delete post
        </span>
      </Button>
    </div>
  );
};

export default PostOption;
