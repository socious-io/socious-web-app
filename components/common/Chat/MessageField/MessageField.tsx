import {
  PaperAirplaneIcon,
  PaperClipIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React, {useCallback, useEffect, useState} from 'react';
import {useRef} from 'react';
import style from './index.module.css';

interface MessageFieldProps {
  onSend: (data?: any) => Promise<void>;
}
import Button from '../../Button/Button';
import ImageUploader from '@components/common/ImageUploader/ImageUploader';
import {ConsoleView} from 'react-device-detect';

const MessageField = ({onSend}: MessageFieldProps) => {
  const [message, setMessage] = useState<string>('');
  const inputField = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const onClickSend = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (message.trim().length !== 0) {
        try {
          await onSend({message: message, file: file});
          setMessage('');
          setFile(null);
          if (inputField.current) inputField.current.innerHTML = '';
        } catch (error) {
          console.log('ERROR IN MSG FIELD :---: ', error);
        }
      }
    },
    [file, message, onSend],
  );

  useEffect(() => {
    const onKeyup = (e: any) => {
      if (e.key === 'Enter' && !e.shiftKey) onClickSend();
    };
    const onKeydown = (e: any) => {
      if (e.key === 'Enter' && !e.shiftKey) e.preventDefault();
    };

    const textArea = inputField.current;
    textArea?.addEventListener('keyup', onKeyup);
    textArea?.addEventListener('keydown', onKeydown);

    return () => {
      textArea?.removeEventListener('keyup', onKeyup);
      textArea?.removeEventListener('keydown', onKeydown);
    };
  }, [onClickSend]);

  return (
    <form
      className="flex w-full items-center justify-between rounded-b-2xl border border-grayLineBased bg-white p-4 pr-2"
      onSubmit={(e) => onClickSend(e)}
    >
      <div className="m-2 w-5">
        <ImageUploader
          withPreview={false}
          onChange={(file: any) => setFile(file)}
        >
          {(openFiles: any) => (
            <PaperClipIcon className="h-5 w-5" onClick={openFiles} />
          )}
        </ImageUploader>
      </div>
      <div className="w-9/12 grow rounded-lg border border-grayLineBased py-1.5 focus-within:ring-1 focus-within:ring-primary md:mx-2">
        <div
          ref={inputField}
          contentEditable
          placeholder="Write a message"
          className={
            'box-border max-h-28 min-h-[36px] overflow-y-auto rounded-lg border-transparent px-2 focus:border-0 focus:outline-none focus:ring-0' +
            ` ${style.placeholder}`
          }
          onInput={(e) => setMessage(e.currentTarget.innerText)}
        />
        {file?.name && (
          <div className="flex items-center gap-3 px-2 pt-4">
            <span>{file.name}</span>
            <div
              className="cursor-pointer rounded-full border bg-white p-1"
              onClick={() => setFile(null)}
            >
              <TrashIcon className="w-4 text-primary" />
            </div>
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        className="border-0 p-2"
        disabled={message.length === 0}
        onClick={() => onClickSend()}
      >
        <PaperAirplaneIcon className="w-5 -rotate-45 cursor-pointer text-grayDisableButton hover:text-grayInputField" />
      </Button>
    </form>
  );
};

export default MessageField;
