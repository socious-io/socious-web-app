import {Avatar, Chip} from '@components/common';
import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline';

export interface PostCardProps {
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
  showAction?: boolean;
}

export function PostCard(
  {
    content,
    name,
    time,
    passion,
    showAction = true
  }: PostCardProps) {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 p-b">
          <Avatar size="s" />
          <p className="text-sm">{name}</p>
          <div className="w-1.5 h-1.5 bg-grayInputField rounded-full" />
          <p className="text-sm text-grayInputField">{time}</p>
        </div>
        <div className="flex">
          <DotsHorizontalIcon className="w-5 h-5" />
        </div>
      </div>
      {/* Image container */}
      <div>
        <div className="w-full h-40 bg-offWhite rounded-lg" />
      </div>
      <div>
        <Chip content={passion ?? ''} contentClassName="text-secondary" />
      </div>
      <div>
        <p className="text-small">{content}</p>
      </div>
      { showAction && 
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-start items-center space-x-1">
            <HeartIcon className="w-5" />
            <p className="text-graySubtitle text-xs">Like</p>
          </div>
          <div className="flex flex-row justify-start items-center space-x-1">
            <ChatAltIcon className="w-5" />
            <p className="text-graySubtitle text-xs">Like</p>
          </div>
          <div className="flex flex-row justify-start items-center space-x-1">
            <ShareIcon className="w-5" />
            <p className="text-graySubtitle text-xs">Like</p>
          </div>
        </div>
      }
    </div>
  );
}

export default PostCard;
