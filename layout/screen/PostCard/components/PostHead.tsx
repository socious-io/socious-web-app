// Components
import {Avatar} from '@components/common';
import PostOption from './PostOption';

// Service
import {isoToHumanTime} from 'services/toHumanTime';

// Type
export interface PostHeadProps {
  name?: string;
  time?: string;
  src?: string;
  onOptionClicked?: any;
}

const PostHead = ({name, time, src, onOptionClicked}: PostHeadProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="p-b flex items-center space-x-2">
        <Avatar size="s" src={src} />
        <p className="text-sm">{name || 'Clear Me'}</p>
        <div className="h-1.5 w-1.5 rounded-full bg-grayInputField" />
        <p className="text-sm text-grayInputField">
          {time ? isoToHumanTime(time) : '00 minutes ago'}
        </p>
      </div>
      {/* HideOption from unauthorized User */}
      {!!onOptionClicked && <PostOption optionClicked={onOptionClicked} />}
    </div>
  );
};

export default PostHead;
