import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';
import { PostCardProps } from './PostCard';

export function HomeCard({content, name, time, passion}: PostCardProps) {
  return (
    <div className="space-y-4 py-4 border-neutralGray border-b">
      <PostHead />
      {/* Image container */}
      <PostContent />
      <PostAction />
    </div>
  );
}

export default HomeCard;