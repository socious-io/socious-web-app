import Link from 'next/link';
import {Button, Modal} from '@components/common';
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import {HeartIcon as LikedIcon} from '@heroicons/react/24/solid';
import {useCallback, useState} from 'react';
import {likePost, unlikePost} from '@api/posts/actions';
export interface PostActionProps {
  liked?: boolean;
  likes?: number;
  shared?: number;
  id: string;
  onLike: (id: string, liked: boolean) => void;
  onShare?: () => void;
  onCommentClicked?: () => void;
}

const PostAction = ({
  liked = false,
  likes,
  shared,
  id,
  onLike,
  onShare,
  onCommentClicked,
}: PostActionProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likesCount, setlikesCount] = useState<number>(likes || 0);

  const toggleLike = useCallback(async () => {
    if (!id) return;
    setlikesCount(() => (isLiked ? likesCount - 1 : likesCount + 1));
    setIsLiked(() => !isLiked);
    try {
      if (isLiked) {
        await unlikePost(id);
        onLike(id, false);
      } else {
        await likePost(id);
        onLike(id, true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, isLiked, likesCount, onLike]);

  return (
    <div className="flex items-center justify-between divide-x divide-x-[1px] divide-grayLineBased">
      {/* Like Button */}
      <Button
        variant="ghost"
        className="flex grow items-center justify-center space-x-1 rounded-none border-0 text-graySubtitle"
        onClick={toggleLike}
      >
        {isLiked ? (
          <LikedIcon className="w-5 text-red-500" />
        ) : (
          <HeartIcon className="w-5" />
        )}
        <p className="text-xs">
          {likesCount ?? '0'} {likesCount === 1 ? 'like' : 'likes'}
        </p>
      </Button>

      {/* Comment Button */}
      {onCommentClicked ? (
        <Button
          variant="ghost"
          className="flex grow items-center justify-center space-x-1 rounded-none border-0 text-graySubtitle"
          onClick={onCommentClicked}
        >
          <ChatBubbleLeftEllipsisIcon className="w-5" />
          <p className="text-xs">Comment</p>
        </Button>
      ) : (
        <Link href={`/app/post/${id}`} passHref>
          <a className="flex grow items-center justify-center">
            <Button
              variant="ghost"
              className="space-x-1 rounded-none border-0 text-graySubtitle"
            >
              <ChatBubbleLeftEllipsisIcon className="w-5" />
              <p className="text-xs">Comment</p>
            </Button>
          </a>
        </Link>
      )}

      {/* Share Button */}
      {/* {onShare ? (
        <Button
          variant="ghost"
          className="flex grow items-center justify-center space-x-1 rounded-none border-0 text-graySubtitle"
          onClick={onShare}
        >
          <ShareIcon className="w-5" />
          <p className="text-xs">
            {shared ?? '0'} {shared === 1 ? 'share' : 'shares'}
          </p>
        </Button>
      ) : (
        <Link href={`/app/post/${id}`} passHref>
          <a className="flex grow items-center justify-center ">
            <Button
              variant="ghost"
              className="space-x-1  rounded-none border-0 text-graySubtitle"
            >
              <ShareIcon className="w-5" />
              <p className="text-xs">
                {shared ?? '0'} {shared === 1 ? 'share' : 'shares'}
              </p>
            </Button>
          </a>
        </Link>
      )} */}
    </div>
  );
};

export default PostAction;
