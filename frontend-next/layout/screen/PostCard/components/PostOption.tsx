import React from 'react';
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import { Button } from '@components/common';


const PostOption = () => {
  return (
    <div className='absolute top-6 right-4 bg-white rounded-2xl drop-shadow-lg border-1 border-grayLineBased w-52 text-base'>
          <Button 
            className='flex items-center space-x-3 w-full font-normal text-black'
            variant='link'
          >
            <PencilIcon className='w-4' />
            <span>
              Edit post
            </span>
          </Button>
          <Button 
            className='flex items-center space-x-3 w-full font-normal text-black'
            variant='link'
          >
            <ShareIcon className='w-4' />
            <span>
              Share post
            </span>
          </Button>
          <Button 
            className='flex items-center space-x-3 w-full font-normal text-black'
            variant='link'
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