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
}

export function PostCard({content, name, time, passion}: PostCardProps) {
  return (
    <div className="space-y-4 py-4 border-neutralGray border-b mb-[-0.5px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 p-b">
          <Avatar size="s"/>
          <p className="text-sm">{name || "Clear Me"}</p>
          <div className="w-1.5 h-1.5 bg-grayInputField rounded-full" />
          <p className="text-sm text-grayInputField">{time || "00 min ago"}</p>
        </div>
        <div className="flex">
          <DotsHorizontalIcon className="w-5 h-5" />
        </div>
      </div>
      {/* Image container */}
      <div className="p-4 rounded-2xl border border-grayLineBased">
        <div>
          <div className="w-full h-40 bg-offWhite rounded-lg" />
        </div>
        <div>
          <Chip content={passion ?? 'Environment'} containerClassName="bg-secondarySLight inline" contentClassName="text-secondary" />
        </div>
        <div>
          <p className="text-small">{content ?? 
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime cupiditate amet perspiciatis blanditiis tempore tempora obcaecati? Eum id excepturi, corrupti vel vitae, quidem perferendis atque, illum odio aperiam eveniet pariatur."
          }</p>
        </div>
      </div>
      <div className="flex justify-between items-center divide-x divide-grayLineBased divide-x-[1px]">
        <div className="flex flex-row justify-center items-center space-x-1 grow">
          <HeartIcon className="w-5" />
          <p className="text-graySubtitle text-xs">Like</p>
        </div>
        <div className="flex flex-row justify-center items-center space-x-1 grow">
          <ChatAltIcon className="w-5" />
          <p className="text-graySubtitle text-xs">Like</p>
        </div>
        <div className="flex flex-row justify-center items-center space-x-1 grow">
          <ShareIcon className="w-5" />
          <p className="text-graySubtitle text-xs">Like</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;