import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';
import { PostCardProps } from './PostCard';

export function HomeCard({content, name, time, passion, liked, likes, shared, src}: PostCardProps) {
  return (
    <div className="space-y-5 py-4 border-neutralGray border-b">
      <PostHead name={name} time={time} src={src}/>
      {/* Image container */}
      <PostContent content={content} passion={passion} />
      <PostAction liked={liked} likes={likes} shared={shared} />
    </div>
  );
}

export default HomeCard;