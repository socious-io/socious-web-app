import Button from '@components/common/Button/Button';
import {SharedCard, HomeCard} from 'layout/screen/PostCard';
import useSWR from 'swr';
import {get} from 'utils/request';

interface PostsProps {
  infinitePosts: any[];
}

const Posts = ({infinitePosts}: PostsProps) => {
  return (
    <div className="space-y-10">
      {infinitePosts.map((posts) =>
        posts?.items?.map((post: any) =>
          !!post.shared_id ? (
            <SharedCard
              key={post.id}
              id={post.id}
              content={post.content}
              time={post.created_at}
              passion={post.causes_tags}
              name={post.identity_meta.name}
              src={post.identity_meta.image}
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
              // placeHolder for now.
              toggleLike={(liked) => console.log('LIKED: ', liked)}
            />
          ) : (
            <HomeCard
              key={post.id}
              id={post.id}
              name={post.identity_meta.name}
              content={post.content}
              time={post.created_at}
              passion={post.causes_tags}
              src={post.identity_meta.image}
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
              // placeHolder For now.
              toggleLike={(liked) => console.log('LIKED: ', liked)}
            />
          ),
        ),
      )}
    </div>
  );
};

export default Posts;
