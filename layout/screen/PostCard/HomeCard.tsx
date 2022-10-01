import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';
import {PostCardProps} from './PostCard';

export function HomeCard({
  id,
  content,
  name,
  time,
  passion,
  liked,
  media,
  likes,
  shared,
  toggleLike,
  src,
  type,
  username,
}: PostCardProps) {
  return (
    <div className="space-y-5 border-b border-neutralGray py-4">
      <PostHead
        type={type}
        username={username}
        id={id}
        name={name}
        time={time}
        src={src}
      />
      {/* Image container */}
      <PostContent content={content} passion={passion} media={media} />
      {toggleLike && (
        <PostAction
          liked={liked}
          likes={likes}
          onLike={toggleLike}
          shared={shared}
          id={id}
        />
      )}
    </div>
  );
}

export default HomeCard;
