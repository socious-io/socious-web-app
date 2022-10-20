import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import { twMerge } from 'tailwind-merge';
import TextArea from '@components/common/TextArea/TextArea';
import { useImperativeHandle } from 'react';
import { useRef } from 'react';


import { IdentityType } from '@models/identity';
interface CommentFieldProps {
  src?: string;
  avatarSize?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  type?: IdentityType;
  onSend: (data?: any) => void;
  hasAttachment?: Boolean;
  onAttach: (data?: any) => void;
  placeholder?: string;
  className?: string;
  row?: number;
}
import { FocusComment } from 'pages/app/post/[pid]';

const CommentField = forwardRef<FocusComment, CommentFieldProps>(
  (
    {
      src,
      avatarSize,
      type = 'users',
      onSend,
      hasAttachment = false,
      onAttach,
      placeholder = 'Write a comment.......',
      className,
      row = 2,
    },
    ref,
  ) => {
    const [comment, setComment] = useState<string>('');
    const [fileSelect, setFileSelect] = useState<any>();
    const [width, setWidth] = useState(window.innerWidth);
    const inputField = useRef<HTMLTextAreaElement>(null);
    const fileField = useRef<HTMLInputElement>(null);

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

    const onClickattach = () => {
      fileField.current && fileField.current.click();
    };

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

    useEffect(() => {
      window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
      });
    }, []);

    const handleFileChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      e?.preventDefault();
      const fileList = e?.target.files;
      if (!fileList) return;
      setFileSelect(fileList[0]);

      setComment(fileList[0]?.name) //// must change 

      if (width <= 500) {
        onAttach(fileList[0])
      }
    };

    return (
      <form
        className={twMerge(
          'flex w-full items-center justify-between rounded-2xl border border-grayLineBased bg-white p-4 pr-2',
          className && className,
        )}
        onSubmit={(e) => onClickSend(e)}
      >
        <Avatar src={src ?? ''} size={avatarSize} type={type} />
        {(hasAttachment && width <= 500) &&
          <>
            <Button
              variant="ghost"
              className="border-0 p-2 mt-1"
              onClick={onClickattach}
            >
              <PaperClipIcon className="w-5 cursor-pointer text-grayDisableButton hover:text-primary" />
            </Button>
            <input
              onChange={handleFileChange}
              type="file"
              accept="*"
              ref={fileField}
              style={{ display: "none" }}
            />
          </>
        }
        <TextArea
          className="resize-none border-grayLineBased focus:border-grayLineBased md:resize-y"
          containerClassName="w-9/12 md:w-11/12 md:mx-2"
          placeholder={placeholder}
          value={comment}
          rows={row}
          ref={inputField}
          onChange={(e) => setComment(e.currentTarget.value)}
        />
        {(hasAttachment && width > 500) &&
          <>
            <Button
              variant="ghost"
              className="border-0 p-2 mt-1"
              onClick={onClickattach}
            >
              <PaperClipIcon className="w-5 cursor-pointer text-grayDisableButton hover:text-primary" />
            </Button>
            <input
              onChange={handleFileChange}
              type="file"
              accept="*"
              ref={fileField}
              style={{ display: "none" }}
            />
            <div className="divide-y text-grayLineBased border-grayLineBased">|</div>
          </>
        }
        <Button
          variant="ghost"
          className="border-0 p-2"
          disabled={comment.length === 0}
          onClick={() => onClickSend()}
        >
          <PaperAirplaneIcon className="w-5 -rotate-45 cursor-pointer text-grayDisableButton hover:text-primary" />
        </Button>
      </form>
    );
  },
);

CommentField.displayName = 'CommentField';

export default CommentField;
