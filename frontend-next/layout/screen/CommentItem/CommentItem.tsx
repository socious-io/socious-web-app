import {Avatar, Button} from '@components/common';
import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { HeartIcon as LikedIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from 'react';
import {twMerge} from 'tailwind-merge';
import { onLikedComment, onUnlikedComment } from '@api/posts/comments/actions';
import useUser from "hooks/useUser/useUser";
export interface CommentProps {
  content: string;
  name: string;
  time: string;
  passion?: string;
  likes:  number;
  className?: string;
  post_id: string;
  id: string;
  mutateComments: () => void;
  liked: boolean;
}

export function CommentItem({
  id,
  post_id,
  content,
  name = 'User Name',
  time,
  likes,
  liked = false,
  mutateComments,
  className
}: CommentProps) {

  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likesCount, setLikesCount] = useState<number>(likes || 0);

  useEffect(() => {
    setIsLiked(() => liked);
    setLikesCount(() => likes);
  }, [liked, likes])

  const onCommentLikedToggle = useCallback(async () => {
    setLikesCount(() => liked ? (likesCount - 1) : (likesCount + 1));
    setIsLiked(!isLiked);
    try {
      console.log("Like Status", isLiked);
      isLiked ?
        await onUnlikedComment(post_id, id)
      :
        await onLikedComment(post_id, id);
      } catch(error) {
        console.log(error);
      }
      mutateComments();
  }, [id, isLiked, liked, likesCount, mutateComments, post_id])

  return (
    <div className={twMerge(
      "p-4 space-y-4 ",
      className && className
    )}>
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
            { content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nialiquet nullam odio maecenas semper. Dui felis"}
          </p>
        </div>
        {/* <div className="flex flex-row justify-start items-center space-x-1 pl-0">
        </div> */}
        <Button
          className="flex flex-row justify-start items-center space-x-1 pl-0 cursor-pointer"
          variant="link"
          onClick={onCommentLikedToggle}
        >
          { isLiked ?
          <LikedIcon className="w-5 text-red-500"/>
          :
          <HeartIcon className="w-5" />
        }
          <p className="text-graySubtitle text-xs">{likesCount ?? "0"} Like</p>
        </Button>
      </div>
    </div>
  );
}

export default CommentItem;
