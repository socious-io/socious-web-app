// Components
import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';
import {useToggle} from '@hooks';
import PostOption from './components/PostOption';

//Types
export interface PostCardProps {
  id: string;
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
  showAction?: boolean;
  liked?: boolean;
  media?: {id: string; url: string}[] | null;
  likes?: number;
  shared?: number;
  src?: string;
  hideOption?: boolean;
  toggleLike?: (liked: boolean) => void;
  focusCommentField?: () => void;
  optionClicked?: (data: string) => void;
  username?: string;
  type?: string;
}

export function PostCard({
  id,
  content,
  name,
  time,
  passion,
  liked,
  src,
  likes,
  media,
  shared,
  showAction = true,
  toggleLike,
  focusCommentField,
  optionClicked,
}: PostCardProps) {
  return (
    <div className="relative space-y-5 rounded-2xl border border-grayLineBased bg-white p-4">
      <PostHead
        name={name}
        time={time}
        src={src}
        onOptionClicked={optionClicked}
      />
      <PostContent content={content} passion={passion} media={media} noBorder />
      {showAction && toggleLike && (
        <PostAction
          liked={liked}
          likes={likes}
          shared={shared}
          id={id}
          onLike={toggleLike}
          onCommentClicked={focusCommentField}
          onShare={optionClicked ? () => optionClicked('SHARE') : undefined}
        />
      )}
    </div>
  );
}

export default PostCard;
