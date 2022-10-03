import {PaperAirplaneIcon} from '@heroicons/react/24/outline';
import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import {twMerge} from 'tailwind-merge';
import TextArea from '@components/common/TextArea/TextArea';
import {useImperativeHandle} from 'react';
import {useRef} from 'react';

interface CommentFieldProps {
  src?: string;
  avatarSize?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  type?: 0 | 1;
  onSend: (data?: any) => void;
  placeholder?: string;
  className?: string;
}
import {FocusComment} from 'pages/app/post/[pid]';

const CommentField = forwardRef<FocusComment, CommentFieldProps>(
  (
    {
      src,
      avatarSize,
      type,
      onSend,
      placeholder = 'Write a comment.......',
      className,
    },
    ref,
  ) => {
    const [comment, setComment] = useState<string>('');
    const inputField = useRef<HTMLTextAreaElement>(null);

    const onClickSend = useCallback(
      (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (comment.trim().length !== 0) {
          onSend(comment);
          setComment('');
        }
      },
      [comment, onSend],
    );

    useEffect(() => {
      const onKeyboardPress = (e: any) => {
        const code = e.keyCode ? e.keyCode : e.which;
        console.log('keyPress', code);
        if (code == 13) onClickSend();
      };
      const textArea = inputField.current;
      textArea?.addEventListener('keyup', onKeyboardPress);
      return () => textArea?.removeEventListener('keyup', onKeyboardPress);
    }, [onClickSend]);

    useImperativeHandle(ref, () => ({
      focusField: () => inputField?.current?.focus(),
    }));

    return (
      <form
        className={twMerge(
          'flex w-full items-center justify-between rounded-2xl border border-grayLineBased bg-white p-4 pr-2',
          className && className,
        )}
        onSubmit={(e) => onClickSend(e)}
      >
        <Avatar src={src ?? ''} size={avatarSize} type={type} />
        <TextArea
          className="resize-none border-grayLineBased focus:border-grayLineBased md:resize-y"
          containerClassName="w-9/12 md:w-11/12 md:mx-2"
          placeholder={placeholder}
          value={comment}
          rows={2}
          ref={inputField}
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
  },
);

CommentField.displayName = 'CommentField';

export default CommentField;
