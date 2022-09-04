import PostHead from './components/PostHead';
import PostCard, { PostCardProps } from './PostCard';

export function HomePostCard({content, name, time, passion}: PostCardProps) {
  return (
    <div className="space-y-4 py-4 border-neutralGray border-b">
      <PostHead name={(name || "name") + " Shared"}/>
      <PostCard />
    </div>
  );
}

export default HomePostCard;