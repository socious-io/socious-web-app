import { post } from 'utils/request';
import PostContent from './components/PostContent';
import PostHead from './components/PostHead';
import PostCard, { PostCardProps } from './PostCard';
import PostAction from './components/PostAction';
import useSWR from 'swr';
import { get } from 'utils/request';
interface SharedCardProps extends PostCardProps {
  sharedPost: any
}

export function SharedCard({name, content, passion, time, media, sharedPost, liked, likes, shared}: SharedCardProps) {

  console.log("sharedPost", sharedPost);

  return (
    <div className="space-y-5 py-4 border-neutralGray border-b">
      <PostHead name={(name || "name") + " Shared"} time={time} src={""} />
      <PostContent content={content} passion={passion} media={media} noBorder/>
      <PostCard 
        content={sharedPost?.content}
        time={sharedPost?.created_at}
        passion={sharedPost?.causes_tags}
        name={sharedPost?.identity_meta?.username}
        src={sharedPost?.identity_meta?.avatar}
        likes={sharedPost?.likes}
        liked={sharedPost?.liked}
        shared={sharedPost?.shared}
        showAction={false}
      />
      <PostAction liked={liked} likes={likes} shared={shared} />
    </div>
  );
}

export default SharedCard;