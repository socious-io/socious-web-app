import Avatar from '@components/common/Avatar/Avatar';
import React from 'react';
import useSWR from 'swr';
import {twMerge} from 'tailwind-merge';
import {get} from 'utils/request';

interface BubbleProps {
  self?: boolean;
  content?: string;
  link?: string;
  identity_id?: string;
}

const Bubble = ({self = true, content, link, identity_id}: BubbleProps) => {
  const {data: participant} = useSWR<any>(
    self ? `user/profile` : identity_id ? `/user/${identity_id}/profile` : null,
    get,
  );

  return (
    <div
      className={twMerge(
        'flex w-full gap-x-4',
        self && 'flex-row-reverse ml-auto items-end',
      )}
    >
      <div>
        <Avatar size="l" src={participant?.avatar?.url ?? ''} />
      </div>
      <div
        className={twMerge(
          'p-4 border border-grayLineBased  max-w-xs',
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
