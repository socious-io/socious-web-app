// Components
import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import PostCard from './PostCard';
import PostAction from './components/PostAction';

// Types
import {PostCardProps} from './PostCard';
import {MetaWithAddress} from '@models/identity';
import {ISharedPost} from '@models/post';

interface SharedCardProps extends PostCardProps {
  sharedPost: ISharedPost & {identity_meta: MetaWithAddress};
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
  type,
  username,
  optionClicked,
}: SharedCardProps) {
  return (
    <div className="relative space-y-5 border-b border-neutralGray py-4">
      <PostHead
        id={id}
        type={type}
        username={username}
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
        passion={sharedPost?.causes_tags?.[0]}
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
