import { HeartIcon, ChatAltIcon, ShareIcon } from "@heroicons/react/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/solid";

export interface PostActionProps {
  liked?: boolean;
}

const PostAction = ({
  liked= false
}: PostActionProps) => {
  return (
    <div className="flex justify-between items-center divide-x divide-grayLineBased divide-x-[1px]">
      <div className="flex flex-row justify-center items-center space-x-1 grow">
        { liked ?
          <LikedIcon className="w-5 text-red-500"/>
          :
          <HeartIcon className="w-5" />
        }
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
  );
};

export default PostAction;