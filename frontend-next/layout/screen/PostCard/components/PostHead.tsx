import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { Avatar } from "@components/common";

export interface PostHeadProps {
  name?: string;
  time?: string;
  hideOption?: boolean;
}

const PostHead = ({
  name,
  time,
  hideOption = false,
}: PostHeadProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2 p-b">
        <Avatar size="s"/>
        <p className="text-sm">{name || "Clear Me"}</p>
        <div className="w-1.5 h-1.5 bg-grayInputField rounded-full" />
        <p className="text-sm text-grayInputField">{time || "00 min ago"}</p>
      </div>
      { !hideOption && 
        <div className="flex">
          <DotsHorizontalIcon className="w-5 h-5" />
        </div>
      }
    </div>
  );
};

export default PostHead;