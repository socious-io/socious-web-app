import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import PostCard, {PostCardProps} from './PostCard';
import PostAction from './components/PostAction';
import {useToggle} from '@hooks';
import PostOption from './components/PostOption';

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
  hideOption,
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
        hideOption={hideOption}
        toggleOptions={handlers.toggle}
      />
      <PostContent content={content} passion={passion} media={media} noBorder />
      <PostCard
        id={sharedPost?.id}
        content={sharedPost?.content}
        time={sharedPost?.created_at}
        passion={sharedPost?.causes_tags}
        name={sharedPost?.identity_meta?.username}
        src={sharedPost?.identity_meta?.avatar}
        likes={sharedPost?.likes}
        liked={sharedPost?.liked}
        shared={sharedPost?.shared}
        showAction={false}
        hideOption={true}
      />
      {showAction && (
        <PostAction
          id={id}
          liked={liked}
          likes={likes}
          shared={shared}
          onShare={optionClicked ? () => optionClicked('SHARE') : undefined}
        />
      )}
      {optionClicked && state && <PostOption optionClicked={optionClicked} />}
    </div>
  );
}

export default SharedCard;
