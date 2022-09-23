import {PaperAirplaneIcon} from '@heroicons/react/24/outline';
import React, {useCallback, useState} from 'react';
import Avatar from '../../Avatar/Avatar';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import {twMerge} from 'tailwind-merge';

interface CommentFieldProps {
  src?: string;
  avatarSize?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  type?: 0 | 1;
  onSend: (data?: any) => void;
  placeholder?: string;
  className?: string;
}

const CommentField = ({
  src,
  avatarSize,
  type,
  onSend,
  placeholder = 'Write a comment.......',
  className,
}: CommentFieldProps) => {
  const [comment, setComment] = useState<string>('');

  const onClickSend = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (comment.length !== 0) {
        onSend(comment);
        setComment('');
      }
    },
    [comment, onSend],
  );

  return (
    <form
      className={twMerge(
        'flex w-full items-center justify-between rounded-2xl border border-grayLineBased bg-white p-4 pr-2',
        className && className,
      )}
      onSubmit={(e) => onClickSend(e)}
    >
      <Avatar src={src ?? ''} size={avatarSize} type={type} />
      <TextInput
        className="border-grayLineBased focus:border-grayLineBased"
        containerClassName="w-9/12 md:w-11/12 md:mx-2"
        placeholder={placeholder}
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      />
      <Button
        variant="ghost"
        className="border-0 p-2"
        disabled={comment.length === 0}
        onClick={() => onClickSend()}
      >
        <PaperAirplaneIcon className="w-5 rotate-45 cursor-pointer text-grayDisableButton hover:text-grayInputField" />
      </Button>
    </form>
  );
};

export default CommentField;
