// Components
import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import PostCard from './PostCard';
import PostAction from './components/PostAction';

// Custom Hook
import {useToggle} from '@hooks';

// Types
import {PostCardProps} from './PostCard';
interface SharedPostType extends PostCardProps {
  identity_meta: any;
  created_at: string;
  causes_tags: string;
}
interface SharedCardProps extends PostCardProps {
  sharedPost: SharedPostType;
}

export function SharedCard({
  id,
  name,
  content,
  src,
  passion,
  time,
  media,
  sharedPost,
  liked,
  likes,
  shared,
  toggleLike,
  focusCommentField,
  showAction = true,
  optionClicked,
}: SharedCardProps) {
  const {state, handlers} = useToggle();

  return (
    <div className="relative space-y-5 border-b border-neutralGray py-4">
      <PostHead
        name={(name || 'name') + ' Shared'}
        time={time}
        src={src}
        onOptionClicked={optionClicked}
      />
      <PostContent content={content} passion={passion} media={media} noBorder />
      <PostCard
        id={sharedPost?.id}
        content={sharedPost?.content}
        time={sharedPost?.created_at}
        passion={sharedPost?.causes_tags}
        name={sharedPost?.identity_meta?.username}
        src={
          sharedPost.identity_meta.avatar ?? sharedPost?.identity_meta?.image
        }
        likes={sharedPost?.likes}
        liked={sharedPost?.liked}
        shared={sharedPost?.shared}
        showAction={false}
        hideOption={true}
      />
      {showAction && toggleLike && (
        <PostAction
          id={id}
          liked={liked}
          likes={likes}
          shared={shared}
          onLike={toggleLike}
          onCommentClicked={focusCommentField}
          onShare={optionClicked ? () => optionClicked('SHARE') : undefined}
        />
      )}
    </div>
  );
}

export default SharedCard;
