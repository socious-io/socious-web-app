// Components
import {Avatar} from '@components/common';
import PostOption from './PostOption';

// Service
import {isoToHumanTime} from 'services/toHumanTime';
import Link from 'next/link';

// Type
export interface PostHeadProps {
  id?: string;
  name?: string;
  time?: string;
  src?: string;
  onOptionClicked?: any;
  type?: string;
  username?: string;
}

const PostHead = ({
  id,
  name,
  time,
  src,
  type,
  username,
  onOptionClicked,
}: PostHeadProps) => {
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
      {!!onOptionClicked && <PostOption optionClicked={onOptionClicked} />}
    </div>
  );
};

export default PostHead;
