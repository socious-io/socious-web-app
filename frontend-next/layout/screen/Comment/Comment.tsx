import { Avatar, Chip } from "@components/common";
import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/outline";

export interface CommentProps {
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
}

export function Comment({
  content,
  name = "User Name",
  time,
  passion,
}: CommentProps) {
  return (
    <div className="p-4 space-y-4">
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

      <div className="pl-10">
        <div className="bg-secondaryLight rounded-lg p-4">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
            aliquet nullam odio maecenas semper. Dui felis
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
