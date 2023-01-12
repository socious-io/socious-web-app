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
  reported,
}: PostCardProps) {
  return (
    <div id={`post-${id}`}>
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
        <PostContent
          id={id}
          content={content}
          passion={passion}
          media={media}
          reported={reported}
        />
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
    </div>
  );
}

export default HomeCard;
