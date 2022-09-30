import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';
import {PostCardProps} from './PostCard';
import {post} from 'utils/request';

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
  src,
}: PostCardProps) {
  return (
    <div className="space-y-5 border-b border-neutralGray py-4">
      <PostHead name={name} time={time} src={src} />
      {/* Image container */}
      <PostContent content={content} passion={passion} media={media} />
      <PostAction liked={liked} likes={likes} shared={shared} id={id} />
    </div>
  );
}

export default HomeCard;
