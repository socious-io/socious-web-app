import Avatar from '@components/common/Avatar/Avatar';
import {EllipsisHorizontalCircleIcon} from '@heroicons/react/24/outline';
import Image from 'next/future/image';
import React from 'react';
import {twMerge} from 'tailwind-merge';
import HorizontalDots from 'asset/icons/horizontal-dots.svg';
import {Popover} from '@headlessui/react';
import Button from '@components/common/Button/Button';
import {toast} from 'react-toastify';
interface BubbleProps {
  self?: boolean;
  content?: string;
  link?: string;
  userInfo?: any;
  mediaId: string | null;
  mediaUrl: string | null;
}

const Bubble = ({
  self = true,
  content,
  link,
  userInfo,
  mediaId,
  mediaUrl,
}: BubbleProps) => {
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
          'flex w-[inherit] max-w-xs flex-col space-y-1',
          self ? 'items-end' : 'items-start',
        )}
      >
        <div
          className={twMerge(
            'max-w-xs border border-grayLineBased  p-4',
            self
              ? 'rounded-l-2xl rounded-tr-2xl bg-secondaryLight  active:border-secondaryDark'
              : 'rounded-r-2xl rounded-bl-2xl bg-offWhite active:border-primary',
          )}
        >
          <p className="whitespace-normal">
            {content ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. '}
          </p>
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
        {mediaId && mediaUrl && (
          <MediaBubble mediaId={mediaId} self={self} mediaUrl={mediaUrl} />
        )}
      </div>
    </div>
  );
};

export default Bubble;

export const MediaBubble = ({
  mediaId,
  self,
  mediaUrl,
}: {
  mediaId: string;
  self: boolean;
  mediaUrl: string;
}) => {
  // Media/:id is not working.
  // const {data, error} = useSWR<any>(`/media/${mediaId}`, get);

  const imgType = /(?:.jpg|.jpeg|.png)$/i.test(mediaUrl);

  console.table({imgType, mediaId, mediaUrl});
  const downloadMedia = () => {
    fetch(mediaUrl)
      .then((res) => res.blob())
      .then((file) => {
        console.log('FILE ', file);
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log('ERROR :--: ', error);
        if (error?.response?.data)
          toast.error(error?.response?.data || 'download failed');
      });
  };

  return (
    <div
      className={twMerge(
        'relative w-full max-w-xs',
        imgType
          ? self
            ? 'rounded-l-2xl rounded-tr-2xl'
            : 'rounded-r-2xl rounded-bl-2xl'
          : self
          ? 'rounded-l-2xl rounded-tr-2xl border border-grayLineBased bg-secondaryLight  p-4 active:border-secondaryDark'
          : 'rounded-r-2xl rounded-bl-2xl border border-grayLineBased bg-offWhite p-4 active:border-primary',
      )}
    >
      <Popover className="absolute top-2 right-2">
        <Popover.Button as="button">
          <div className="cursor-pointer rounded-full border-2 border-grayLineBased bg-white p-2">
            <Image
              src={HorizontalDots}
              width={100}
              height={100}
              className="h-3 w-3"
              alt="download option"
            />
          </div>
        </Popover.Button>
        <Popover.Panel
          as="div"
          className="absolute right-[-180%] bottom-full mb-2 min-w-[8rem] rounded-2xl border border-grayLineBased bg-white py-2 px-3"
        >
          <Button
            variant="link"
            className="gap-3 font-normal text-black"
            onClick={downloadMedia}
          >
            Download
          </Button>
        </Popover.Panel>
      </Popover>
      {imgType ? (
        <Image
          width={100}
          height={100}
          alt={'Image Id'}
          src={mediaUrl}
          className={twMerge(
            'w-full max-w-xs',
            self
              ? 'rounded-l-2xl rounded-tr-2xl'
              : 'rounded-r-2xl rounded-bl-2xl',
          )}
        />
      ) : (
        <div>{mediaId + '.file'}</div>
      )}
    </div>
  );
};
