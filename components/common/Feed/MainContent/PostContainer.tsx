// Packages
import {forwardRef, useCallback, useImperativeHandle, useMemo} from 'react';
import {GridLoader} from 'react-spinners';

// Components
import Button from '@components/common/Button/Button';
import Posts from './Posts';

// Hooks
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

// Types
import {InsertNewPost} from '.';
import {IPost} from '@models/post';

const PostContainer = forwardRef<InsertNewPost>((props, ref) => {
  const {
    flattenData,
    isLoading,
    mutateInfinite: mutatePosts,
    seeMore,
    loadMore,
    size,
  } = useInfiniteSWR<IPost>('/posts', {
    shouldRetryOnError: false,
    revalidateFirstPage: false,
  });

  // Add new Post onCreate
  useImperativeHandle(ref, () => ({
    setNewPost: (post: any) => {
      mutatePosts(
        (oldPosts) => {
          oldPosts?.[0]?.items.unshift(post);
          return oldPosts;
        },
        {revalidate: false},
      );
    },
  }));

  //Toggle Like
  const toggleLike = useCallback(
    (id: string, liked: boolean) => {
      mutatePosts(
        (oldPosts) => {
          if (!oldPosts) return [];
          for (let i = 0; i < size; i++) {
            let posts = oldPosts[i].items;
            for (let j = 0, len = oldPosts[i].items.length; j < len; j++) {
              let oldPost = posts[j];
              //if this is toggle-post, change the value.
              posts[j] =
                oldPost.id === id
                  ? {
                      ...oldPost,
                      liked: liked,
                      likes: liked ? oldPost.likes + 1 : oldPost.likes - 1,
                    }
                  : oldPost;
            }
            oldPosts[i].items = posts;
          }
          return oldPosts;
        },
        {revalidate: false},
      );
    },
    [mutatePosts, size],
  );

  // If loading.
  if (isLoading)
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );
  return (
    <div className="sm:space-y-2">
      {/* Passing infintePosts to render on mutation */}
      <Posts infinitePosts={flattenData ?? []} toggleLike={toggleLike} />
      {seeMore && (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="font-semibold text-primary"
            onClick={loadMore}
            disabled={!seeMore}
          >
            See more
          </Button>
        </div>
      )}
    </div>
  );
});

PostContainer.displayName = 'PostContainer';

export default PostContainer;
