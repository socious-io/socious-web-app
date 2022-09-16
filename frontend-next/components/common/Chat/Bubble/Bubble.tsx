import Avatar from '@components/common/Avatar/Avatar';
import React from 'react';
import {twMerge} from 'tailwind-merge';

interface BubbleProps {
  self?: boolean;
  content?: string;
  src?: string;
  link?: string;
}

const Bubble = ({self = true, content, src, link}: BubbleProps) => {
  return (
    <div
      className={twMerge(
        'flex w-full gap-x-4',
        self
          ? 'flex-row-reverse ml-auto items-end focus:border-secondaryDark'
          : 'focus:border-primary',
      )}
    >
      <div>
        <Avatar size="l" src={src ?? ''} />
      </div>
      <div
        className={twMerge(
          'p-4 border border-grayLineBased  max-w-xs',
          self
            ? 'rounded-l-2xl rounded-tr-2xl bg-secondaryLight'
            : 'rounded-r-2xl rounded-bl-2xl bg-offWhite',
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
