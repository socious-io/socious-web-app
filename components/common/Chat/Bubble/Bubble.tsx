import Avatar from '@components/common/Avatar/Avatar';
import React from 'react';
import {twMerge} from 'tailwind-merge';

interface BubbleProps {
  self?: boolean;
  content?: string;
  link?: string;
  userInfo?: any;
}

const Bubble = ({self = true, content, link, userInfo}: BubbleProps) => {
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
          'max-w-xs border border-grayLineBased  p-4',
          self
            ? 'rounded-l-2xl rounded-tr-2xl bg-secondaryLight  active:border-secondaryDark'
            : 'rounded-r-2xl rounded-bl-2xl bg-offWhite active:border-primary',
        )}
      >
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
