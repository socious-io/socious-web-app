import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';


export interface PostCardProps {
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
  showAction?: boolean;
  liked?: boolean;
  media?: string[] | null;
  likes?: number,
  shared?: number,
  src?: string,
}


export function PostCard({content, name, time, passion, liked, showAction = true, src, likes,shared}: PostCardProps) {
  return (
    <div className='space-y-5 p-4 rounded-2xl border border-grayLineBased bg-white'>
      <PostHead name={name} time={time} src={src} hideOption />
      <PostContent content={content} passion={passion} noBorder />
      { showAction &&
          <PostAction liked={liked} likes={likes} shared={shared} />
      }
    </div>
  );
}

export default PostCard;