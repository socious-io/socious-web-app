import PostHead from './components/PostHead';
import PostContent from './components/PostContent';
import PostAction from './components/PostAction';
import { useToggle } from '@hooks';
import PostOption from './components/PostOption';

export interface PostCardProps {
  id: string;
  content?: string;
  name?: string;
  time?: string;
  passion?: string;
  showAction?: boolean;
  liked?: boolean;
  media?: string[] | null;
  likes?: number;
  shared?: number;
  src?: string;
  hideOption?: boolean
  optionClicked?: (data: string) => void;
}


export function PostCard({
  id,
  content,
  name,
  time,
  passion,
  liked,
  src,
  likes,
  shared,
  hideOption,
  showAction = true,
  optionClicked
}: PostCardProps) {
  
  const {state, handlers} = useToggle();

  return (
    <div className='relative space-y-5 p-4 rounded-2xl border border-grayLineBased bg-white'>
      <PostHead name={name} time={time} src={src} hideOption={hideOption} toggleOptions={handlers.toggle}/>
      <PostContent content={content} passion={passion} noBorder />
      { showAction &&
          <PostAction liked={liked} likes={likes} shared={shared} id={id} onShare={ optionClicked ? () => optionClicked('SHARE') : undefined }/>
      }
      {
        optionClicked && state && 
        <PostOption optionClicked={optionClicked} />
      }
    </div>
  );
}

export default PostCard;