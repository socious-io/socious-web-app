import {IPost} from '@models/post';
import {HomeCard, SharedCard} from 'layout/screen/PostCard';
import {FC, useCallback} from 'react';

interface PostResultsProps {
  items: IPost[];
}

export const PostResults: FC<PostResultsProps> = ({items}) => {
  const toggleLike = useCallback((id: string, liked: boolean) => {
    console.log(id, liked);
  }, []);

  return (
    <>
      {items.map((post) =>
        !!post.shared_id ? (
          <SharedCard
            key={post.id}
            id={post.id}
            content={post.content}
            time={post.created_at}
            passion={post.causes_tags?.[0]}
            name={post.identity_meta.name}
            src={
              post.identity_type === 'users'
                ? post.identity_meta.avatar
                : post.identity_meta.image
            }
            shared={post.shared}
            liked={post.liked}
            likes={post.likes}
            media={post.media}
            sharedPost={{
              ...post.shared_post,
              identity_meta: post.shared_from_identity.meta,
            }}
            type={post.identity_type}
            username={
              post.identity_type === 'users'
                ? post.identity_meta.username
                : post.identity_meta.shortname
            }
            toggleLike={toggleLike}
            reported={post.reported}
          />
        ) : (
          <HomeCard
            key={post.id}
            id={post.id}
            name={post.identity_meta.name}
            content={post.content}
            time={post.created_at}
            passion={post.causes_tags?.[0]}
            src={
              post.identity_type === 'users'
                ? post.identity_meta.avatar
                : post.identity_meta.image
            }
            liked={post.liked}
            likes={post.likes}
            shared={post.shared}
            type={post.identity_type}
            username={
              post.identity_type === 'users'
                ? post.identity_meta.username
                : post.identity_meta.shortname
            }
            media={post.media}
            toggleLike={toggleLike}
            reported={post.reported}
          />
        ),
      )}
    </>
  );
};
