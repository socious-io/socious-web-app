import { post } from 'utils/request';
import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import PostCard, { PostCardProps } from './PostCard';
import PostAction from './components/PostAction';
import {useToggle} from '@hooks';
import PostOption from './components/PostOption';

interface SharedCardProps extends PostCardProps {
  sharedPost: any
}

export function SharedCard({
  id,
  name, 
  content,
  src, 
  passion, 
  time, 
  media, 
  sharedPost, 
  liked, 
  likes, 
  shared,
  hideOption = false,
}: SharedCardProps) {

  const {state, handlers} = useToggle();
  
  return (
    <div className="relative space-y-5 py-4 border-neutralGray border-b">
      <PostHead name={(name || "name") + " Shared"} time={time} src={src} toggleOptions={handlers.toggle} />
      <PostContent content={content} passion={passion} media={media} noBorder/>
      <PostCard
        id={sharedPost?.id}
        content={sharedPost?.content}
        time={sharedPost?.created_at}
        passion={sharedPost?.causes_tags}
        name={sharedPost?.identity_meta?.username}
        src={sharedPost?.identity_meta?.avatar}
        likes={sharedPost?.likes}
        liked={sharedPost?.liked}
        shared={sharedPost?.shared}
        hideOption={true}
        showAction={false}
      />
      <PostAction liked={liked} likes={likes} shared={shared} id={id}/>
      {
        !hideOption && state && 
        <PostOption />
      }
    </div>
  );
}

export default SharedCard;