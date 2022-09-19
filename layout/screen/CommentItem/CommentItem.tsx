import {Avatar, Button} from '@components/common';
import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import {HeartIcon as LikedIcon} from '@heroicons/react/24/solid';
import {useCallback, useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';
import {onLikedComment, onUnlikedComment} from '@api/posts/comments/actions';
import useUser from 'hooks/useUser/useUser';
export interface CommentProps {
  content: string;
  name: string;
  time: string;
  passion?: string;
  likes: number;
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
  className,
}: CommentProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likesCount, setLikesCount] = useState<number>(likes || 0);

  useEffect(() => {
    setIsLiked(() => liked);
    setLikesCount(() => likes);
  }, [liked, likes]);

  const onCommentLikedToggle = useCallback(async () => {
    setLikesCount(() => (liked ? likesCount - 1 : likesCount + 1));
    setIsLiked(!isLiked);
    try {
      console.log('Like Status', isLiked);
      isLiked
        ? console.log('Unliking', await onUnlikedComment(post_id, id))
        : console.log('Liking', await onLikedComment(post_id, id));
    } catch (error) {
      console.log(error);
    }
    mutateComments();
  }, [id, isLiked, liked, likesCount, mutateComments, post_id]);

  return (
    <div className={twMerge('space-y-4 p-4 ', className && className)}>
      <div className="flex items-center justify-between">
        <div className="p-b flex items-center space-x-2">
          <Avatar size="s" />
          <p className="text-sm">{name}</p>
          <div className="h-1.5 w-1.5 rounded-full bg-grayInputField" />
          <p className="text-sm text-grayInputField">{time ?? '0 min ago'}</p>
        </div>
        <div className="flex">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="pl-10">
        <div className="rounded-lg bg-secondaryLight p-4">
          <p className="text-sm">
            {content ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nialiquet nullam odio maecenas semper. Dui felis'}
          </p>
        </div>
        {/* <div className="flex flex-row justify-start items-center space-x-1 pl-0">
        </div> */}
        <Button
          className="flex cursor-pointer flex-row items-center justify-start space-x-1 pl-0"
          variant="link"
          onClick={onCommentLikedToggle}
        >
          {isLiked ? (
            <LikedIcon className="w-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5" />
          )}
          <p className="text-xs text-graySubtitle">{likesCount ?? '0'} Like</p>
        </Button>
      </div>
    </div>
  );
}

export default CommentItem;
