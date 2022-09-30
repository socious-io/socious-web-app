import {EllipsisHorizontalIcon} from '@heroicons/react/24/outline';
import {Avatar} from '@components/common';
import {useCallback, useEffect} from 'react';
import {Button} from 'components/common';
import {isoToHumanTime} from 'services/toHumanTime';
import Link from 'next/link';
export interface PostHeadProps {
  id?: string;
  name?: string;
  time?: string;
  hideOption?: boolean;
  src?: string;
  toggleOptions?: () => void;
  type?: string;
  username?: string;
}

const PostHead = ({
  id,
  name,
  time,
  hideOption = false,
  src,
  type,
  username,
  toggleOptions,
}: PostHeadProps) => {
  const handleOptions = useCallback(() => {
    if (toggleOptions) toggleOptions();
  }, [toggleOptions]);

  return (
    <div className="flex items-center justify-between">
      <div className="p-b flex items-center space-x-2">
        <Link
          href={`/app/${
            type === 'users' ? 'user' : 'organization'
          }/${username}`}
          passHref
        >
          <div className="justify-betwee flex items-center space-x-2">
            <Avatar size="s" src={src} />
            <p className="text-sm">{name || 'Clear Me'}</p>
            <div className="h-1.5 w-1.5 rounded-full bg-grayInputField" />
          </div>
        </Link>
        <Link href={`/app/post/${id}`} passHref>
          <p className="text-sm text-grayInputField">
            {time ? isoToHumanTime(time) : '00 minutes ago'}
          </p>
        </Link>
      </div>
      {/* HideOption from unauthorized User */}
      {!hideOption && (
        <Button
          variant="ghost"
          className="flex border-0 p-2"
          onClick={handleOptions}
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default PostHead;
