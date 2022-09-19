import {EllipsisHorizontalIcon} from '@heroicons/react/24/outline';
import {Avatar} from '@components/common';
import {useCallback, useEffect} from 'react';
import {Button} from 'components/common';
import {isoToHumanTime} from 'services/toHumanTime';
export interface PostHeadProps {
  name?: string;
  time?: string;
  hideOption?: boolean;
  src?: string;
  toggleOptions?: () => void;
}

const PostHead = ({
  name,
  time,
  hideOption = false,
  src,
  toggleOptions,
}: PostHeadProps) => {
  const handleOptions = useCallback(() => {
    if (toggleOptions) toggleOptions();
  }, [toggleOptions]);

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
