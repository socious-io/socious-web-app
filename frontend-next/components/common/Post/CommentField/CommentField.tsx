import { PaperAirplaneIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import TextInput from '../../TextInput/TextInput';
import Button from "../../Button/Button"

interface CommentFieldProps {
  src?: string;
  onSend: (data?: any) => void;
}

const CommentField = ({
  src,
  onSend,
}: CommentFieldProps) => {
  const [comment, setComment] = useState<string>("");
  return (
    <div className='p-4 pr-2 flex w-full items-center justify-between border border-grayLineBased bg-white rounded-2xl'>
      <Avatar src={src ?? ""}/>
      <TextInput
        className='border-grayLineBased focus:border-grayLineBased'
        containerClassName='w-9/12 md:w-11/12 md:mx-2'
        placeholder='Write a comment.......'
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      />
      <Button
        variant='ghost'
        className='border-0 p-2'
        onClick={() => onSend(comment)}
        disabled={comment.length === 0}
      >
        <PaperAirplaneIcon className='w-5 rotate-45 text-grayDisableButton cursor-pointer hover:text-grayInputField'/>

      </Button>
    </div>
  );
};

export default CommentField;