// Packages
import {useCallback, useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

// Services
import {isoToHumanTime} from 'services/toHumanTime';

// Api
import {onLikedComment, onUnlikedComment} from '@api/posts/comments/actions';

// Components
import {Avatar, Button} from '@components/common';

// Icons
import {EllipsisHorizontalIcon, HeartIcon} from '@heroicons/react/24/outline';
import {HeartIcon as LikedIcon} from '@heroicons/react/24/solid';

//Type
export interface CommentItemProps {
  content: string;
  identity: any;
  time: string;
  passion?: string;
  likes: number;
  className?: string;
  post_id: string;
  id: string;
  liked: boolean;
  onLikeToggle: (commentId: string, liked: boolean) => void;
}

export function CommentItem({
  id,
  post_id,
  content,
  identity,
  time,
  likes,
  liked = false,
  className,
  onLikeToggle,
}: CommentItemProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likesCount, setLikesCount] = useState<number>(likes || 0);

  useEffect(() => {
    setIsLiked(() => liked);
    setLikesCount(() => likes);
  }, [liked, likes]);

  // On Like Icon Clicked.
  const onLikedClicked = useCallback(async () => {
    setLikesCount(() => (liked ? likesCount - 1 : likesCount + 1));
    setIsLiked(!isLiked);
    try {
      isLiked
        ? await onUnlikedComment(post_id, id)
        : await onLikedComment(post_id, id);
      onLikeToggle(id, !isLiked);
    } catch (error) {
      console.log(error);
    }
  }, [id, isLiked, liked, likesCount, onLikeToggle, post_id]);

  return (
    <div className={twMerge('space-y-4 p-4 ', className && className)}>
      <div className="flex items-center justify-between">
        <div className="p-b flex items-center space-x-2">
          <Avatar
            size="s"
            type={identity?.identity_type === 'users' ? 0 : 1}
            src={
              identity?.identity_type === 'users'
                ? identity?.avatar
                : identity?.image
            }
          />
          <p className="text-sm">{identity?.name}</p>
          <div className="h-1.5 w-1.5 rounded-full bg-grayInputField" />
          <p className="text-sm text-grayInputField">
            {isoToHumanTime(time) ?? '0 min ago'}
          </p>
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
          onClick={onLikedClicked}
        >
          {isLiked ? (
            <LikedIcon className="w-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5" />
          )}
          <p className="text-xs text-graySubtitle">
            {likesCount ?? '0'} {likesCount === 1 ? 'like' : 'likes'}
          </p>
        </Button>
      </div>
    </div>
  );
}

export default CommentItem;
