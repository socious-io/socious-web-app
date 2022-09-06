import {Avatar, Chip} from '@components/common';
import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline';

export interface CommentProps {
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
  likes?:  string | number;
}

export function CommentItem({
  content,
  name = 'User Name',
  time,
  passion,
  likes,
}: CommentProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 p-b">
          <Avatar size="s" />
          <p className="text-sm">{name}</p>
          <div className="w-1.5 h-1.5 bg-grayInputField rounded-full" />
          <p className="text-sm text-grayInputField">{time ?? "0 min ago"}</p>
        </div>
        <div className="flex">
          <DotsHorizontalIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="pl-10">
        <div className="bg-secondaryLight rounded-lg p-4">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
            aliquet nullam odio maecenas semper. Dui felis
          </p>
        </div>
        <div className="flex flex-row justify-start items-center space-x-1">
          <HeartIcon className="w-5" />
          <p className="text-graySubtitle text-xs">{likes ?? "0"} Like</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
