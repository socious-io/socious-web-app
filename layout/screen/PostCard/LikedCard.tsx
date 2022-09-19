import PostHead from './components/PostHead';
// import PostContent from './components/PostContent';
// import PostAction from './components/PostAction';
// import PostCard from './PostCard';
import {PostCardProps} from './PostCard';

export function LikedCard({id, content, name, time, passion}: PostCardProps) {
  return (
    <div className="space-y-5 border-b border-neutralGray py-4">
      <PostHead name={(name || 'name') + ' liked'} />
      {/* <PostCard /> */}
    </div>
  );
}

export default LikedCard;
