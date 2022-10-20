import Avatar from '@components/common/Avatar/Avatar';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { useToggle } from '@hooks';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface BubbleProps {
  self?: boolean;
  content?: string;
  link?: string;
  userInfo?: any;
  media_id: any;
  media_url: any;
  downloadMedia: (media_url: string) => void;
}

const Bubble = ({ self = true, content, link, userInfo, media_id, media_url, downloadMedia }: BubbleProps) => {

  const { state: addState, handlers: addHandlers } = useToggle();

  const onClickDownload = () => {
    if (media_url) {
      downloadMedia(media_url)
    }
  };

  return (
    <div
      className={twMerge(
        'mt-2 flex w-full gap-x-4',
        self && 'ml-auto flex-row-reverse items-end',
      )}
    >
      <div>
        <Avatar
          size="l"
          src={
            userInfo?.identity_meta?.avatar || userInfo?.identity_meta?.image
          }
          type={userInfo?.identity_type}
        />
      </div>
      <div
        className={twMerge(
          'max-w-xs border border-grayLineBased',
          (media_id && content?.trim().length !== 0) ? 'p-2' : (media_id && content?.trim().length == 0) ? 'p-0' : 'p-4',
          self
            ? 'rounded-l-2xl rounded-tr-2xl bg-secondaryLight  active:border-secondaryDark'
            : 'rounded-r-2xl rounded-bl-2xl bg-offWhite active:border-primary',
        )}
      >
        {media_id && media_url && (
          <div className="relative h-auto max-h-96 w-full overflow-hidden rounded-lg bg-offWhite">
            <div
              className="absolute cursor-pointer shadow-2xl top-0 right-0 rounded-md bg-white p-2"
              style={{ zIndex: 999, display: addState ? 'block' : 'none' }}
              onClick={onClickDownload}
            >
              <h4 className="min-h-[10px] text-center">Download</h4>
            </div>

            <div
              className="absolute cursor-pointer right-0 rounded-full bg-white p-2"
              style={{ zIndex: 99 }}
              onClick={() => addHandlers.toggle()}
            >
              <EllipsisHorizontalIcon className="w-6 text-gray" />
            </div>

            <Image
              alt="message media"
              src={media_url}
              className="object-scale-down"
              width="150"
              height="150"
              style={{ width: '100%', height: 'auto', maxHeight: '24rem' }}
            />
          </div>
        )}
        {content ??
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. '}
        {link && (
          <p className="mt-2">
            <a
              href={link}
              className="text-secondary underline underline-offset-8"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Bubble;
