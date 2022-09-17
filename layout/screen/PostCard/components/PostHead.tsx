import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@components/common";
import { useCallback, useEffect } from "react";
import {Button} from 'components/common'
import { isoToHumanTime } from "services/toHumanTime";
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
  toggleOptions
}: PostHeadProps) => {

  const handleOptions = useCallback(() => {
    if (toggleOptions) toggleOptions();
  }, [toggleOptions]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2 p-b">
        <Avatar size="s" src={src} />
        <p className="text-sm">{name || "Clear Me"}</p>
        <div className="w-1.5 h-1.5 bg-grayInputField rounded-full" />
        <p className="text-sm text-grayInputField">{time ? isoToHumanTime(time) : "00 minutes ago"}</p>
      </div>
      {/* HideOption from unauthorized User */}
      { !hideOption && 
        <Button
          variant='ghost'
          className='border-0 p-2 flex'
          onClick={handleOptions}
        >
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </Button>
      }
    </div>
  );
};

export default PostHead;
