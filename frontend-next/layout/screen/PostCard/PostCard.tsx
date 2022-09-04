import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';


export interface PostCardProps {
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
  showAction?: boolean;
}


export function PostCard({content, name, time, passion}: PostCardProps) {
  return (
    <div className='space-y-4 p-4 rounded-2xl border border-grayLineBased'>
      <PostHead hideOption />
      <PostContent noBorder />
      <PostAction liked/>
    </div>
  );
}

export default PostCard;