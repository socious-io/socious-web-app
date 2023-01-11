import {getText} from '@socious/data';
import {Popover} from '@headlessui/react';
import React, {useRef} from 'react';
import Image from 'next/future/image';
import {Chip} from '@components/common';
import {twMerge} from 'tailwind-merge';
import MoreIcon from 'asset/icons/more.svg';
import {reportPost, blockPost} from '@api/posts/actions';

export interface PostContentProps {
  id: string;
  reported: boolean;
  passion?: string;
  content?: string;
  noBorder?: boolean;
  media?: {id: string; url: string}[] | null;
}

const PostContent = ({
  id,
  passion,
  content,
  reported,
  noBorder = false,
  media = [],
}: PostContentProps) => {
  const popOverRef = useRef<HTMLButtonElement | null>(null);
  console.log(reported);
  const report = async () => {
    try {
      await reportPost(id);
    } catch (err) {
      console.log(err);
    }
    reported = true;
    popOverRef.current?.click();
  };
  const block = async () => {
    try {
      await blockPost(id);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <div
      className={twMerge(
        'space-y-4',
        noBorder ? '' : `rounded-2xl border border-grayLineBased bg-white p-4`,
      )}
    >
      <Popover className="grid grid-cols-1 place-items-end gap-4">
        <Popover.Button ref={popOverRef}>
          <Image
            src={MoreIcon}
            alt="more"
            className="object-scale-down"
            width="5"
            height="5"
          />
        </Popover.Button>
        <Popover.Panel
          as="div"
          className="md:min-h-auto absolute top-0 left-0 z-10 w-screen bg-offWhite md:top-auto md:right-0 md:left-auto md:min-w-[10rem] md:max-w-[12rem] md:overflow-hidden md:rounded-2xl md:border"
        >
          <div className="hide-scrollbar relative h-screen space-y-2 divide-y divide-offsetColor overflow-y-scroll pt-12 md:h-auto md:pt-0">
            <ul className="!mt-0 list-none divide-y divide-offsetColor sm:!border-0">
              <li
                className="flex cursor-pointer items-center space-x-4 whitespace-nowrap p-4 hover:bg-error hover:text-offWhite"
                onClick={async () => await block()}
              >
                Block post
              </li>
              <li
                className={
                  !reported
                    ? 'flex cursor-pointer items-center space-x-4 whitespace-nowrap p-4 hover:bg-error hover:text-offWhite'
                    : 'flex items-center space-x-4 whitespace-nowrap p-4'
                }
                onClick={async () => await report()}
              >
                Report post
              </li>
            </ul>
          </div>
        </Popover.Panel>
      </Popover>

      {media && media.length > 0 && (
        <div className="relative h-auto max-h-96 w-full overflow-hidden rounded-lg bg-offWhite">
          <Image
            alt={passion ?? 'post media'}
            src={media[0]?.url}
            className="object-scale-down"
            width="100"
            height="100"
            style={{width: '100%', height: 'auto', maxHeight: '24rem'}}
          />
        </div>
      )}
      {passion && (
        <div className="mb-3">
          <Chip
            content={getText('en', `PASSION.${passion}`) || passion}
            containerClassName="bg-secondarySLight inline-block"
            contentClassName="text-secondary"
          />
        </div>
      )}
      <div>
        <p className="text-small break-words">{content}</p>
      </div>
    </div>
  );
};

export default PostContent;
