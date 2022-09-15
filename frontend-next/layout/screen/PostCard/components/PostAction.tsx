import Link from "next/link";
import { Button, Modal } from "@components/common";
import { HeartIcon, ChatAltIcon, ShareIcon } from "@heroicons/react/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/solid";
import { useCallback, useState } from "react";
import { likePost, unlikePost } from "@api/posts/actions";
import useUser from "hooks/useUser/useUser";
export interface PostActionProps {
  liked?: boolean;
  likes?: number;
  shared?: number;
  id: string;
  onShare?: () => void;
}

const PostAction = ({
  liked= false,
  likes,
  shared,
  id,
  onShare,
}: PostActionProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likesCount, setlikesCount] = useState<number>(likes || 0);
  const { user } = useUser();

  const toggleLike = useCallback(async() => {
    if (!id) return
    setlikesCount(() => isLiked ? (likesCount - 1) : (likesCount + 1))
    setIsLiked(() => !isLiked);
    try {
      isLiked ?
        await unlikePost(id)
      :
        await likePost(id);
    } catch(error) {
      console.error(error);
    }
  }, [id, isLiked, likesCount])

  return (
    <div className="flex justify-between items-center divide-x divide-grayLineBased divide-x-[1px]">
      <Button
        variant="ghost"
        className="flex flex-row justify-center text-graySubtitle items-center space-x-1 grow border-0 rounded-none"
        onClick={toggleLike}
        >
        { isLiked ?
          <LikedIcon className="w-5 text-red-500"/>
          :
          <HeartIcon className="w-5" />
        }
        <p className="text-xs">{likesCount} Like</p>
      </Button>
      <Link href={`/post/${id}`} passHref>
        <a>
          <Button
            variant="ghost"
            className="flex flex-row justify-center text-graySubtitle items-center space-x-1 grow border-0 rounded-none"
            >
            <ChatAltIcon className="w-5" />
            <p className="text-xs">Comment</p>
          </Button>
        </a>
      </Link>
      {
        onShare ?
        <Button
        variant="ghost"
        className="flex flex-row justify-center text-graySubtitle items-center space-x-1 grow border-0 rounded-none"
        onClick={onShare}
        >
          <ShareIcon className="w-5" />
          <p className="text-xs">{shared} Share</p>
        </Button>
        :
        <Link href={`/post/${id}`} passHref>
          <a>
            <Button 
              variant="ghost"
              className="flex flex-row justify-center text-graySubtitle items-center space-x-1 grow border-0 rounded-none"
              >
              <ShareIcon className="w-5" />
              <p className="text-xs">{shared} Share</p>
            </Button>
            </a>
        </Link>
      }
    </div>
  );
};

export default PostAction;