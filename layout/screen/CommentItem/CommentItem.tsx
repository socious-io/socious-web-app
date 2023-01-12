// Packages
import {useCallback, useEffect, useState, useRef} from 'react';
import {twMerge} from 'tailwind-merge';
import {reportComment, blockComment} from '@api/posts/comments/actions';
// Services
import {isoToHumanTime} from 'services/toHumanTime';

// Api
import {onLikedComment, onUnlikedComment} from '@api/posts/comments/actions';

// Components
import {Avatar, Button} from '@components/common';

// Icons
import {EllipsisHorizontalIcon, HeartIcon} from '@heroicons/react/24/outline';
import {HeartIcon as LikedIcon} from '@heroicons/react/24/solid';
import {IdentityType, MetaWithAddress} from '@models/identity';
import {Popover} from '@headlessui/react';
import Image from 'next/future/image';
import MoreIcon from 'asset/icons/more.svg';

//Type
export interface CommentItemProps {
  content: string;
  identity: MetaWithAddress & {identity_type: IdentityType};
  time: string;
  passion?: string;
  likes: number;
  className?: string;
  post_id: string;
  id: string;
  liked: boolean;
  reported: boolean;
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
  reported,
}: CommentItemProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likesCount, setLikesCount] = useState<number>(likes || 0);

  const actionClass =
    'flex cursor-pointer items-center space-x-4 whitespace-nowrap p-4 hover:bg-error hover:text-offWhite';
  const deactiveClass = 'flex items-center space-x-4 whitespace-nowrap p-4';

  const popOverRef = useRef<HTMLButtonElement | null>(null);

  const [reportClass, setReportClass] = useState(
    reported ? deactiveClass : actionClass,
  );

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

  const report = async () => {
    try {
      await reportComment(id);
    } catch (err) {
      console.log(err);
    }
    setReportClass(deactiveClass);
    popOverRef.current?.click();
  };
  const block = async () => {
    try {
      await blockComment(id);
    } catch (err) {
      console.log(err);
    }
    let element = document.getElementById(`comment-${id}`);
    element?.classList.add('hidden');
  };

  return (
    <div
      id={`comment-${id}`}
      className={twMerge('space-y-4 p-4 ', className && className)}
    >
      <div className="flex items-center justify-between">
        <div className="p-b flex items-center space-x-2">
          <Avatar
            size="s"
            type={identity?.identity_type}
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
          <Popover className="grid grid-cols-1 place-items-end gap-4">
            <Popover.Button ref={popOverRef}>
              <Image
                src={MoreIcon}
                alt="more"
                className="object-scale-down"
                width="5"
                height="5"
              />
            </Popover.Button>
            <Popover.Panel
              as="div"
              className="md:min-h-auto absolute top-0 left-0 z-10 w-screen bg-offWhite md:top-auto md:right-0 md:left-auto md:min-w-[10rem] md:max-w-[12rem] md:overflow-hidden md:rounded-2xl md:border"
            >
              <div className="hide-scrollbar relative h-screen space-y-2 divide-y divide-offsetColor overflow-y-scroll pt-12 md:h-auto md:pt-0">
                <ul className="!mt-0 list-none divide-y divide-offsetColor sm:!border-0">
                  <li
                    className={actionClass}
                    onClick={async () => await block()}
                  >
                    Block comment
                  </li>
                  <li
                    className={reportClass}
                    onClick={async () => await report()}
                  >
                    Report comment
                  </li>
                </ul>
              </div>
            </Popover.Panel>
          </Popover>
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
