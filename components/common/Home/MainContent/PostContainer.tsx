// Packages
import {forwardRef, useCallback, useImperativeHandle, useMemo} from 'react';
import useSWRInfinite from 'swr/infinite';
import {GridLoader} from 'react-spinners';

// Components
import Button from '@components/common/Button/Button';
import Posts from './Posts';

// Services/functions
import {get} from 'utils/request';

// Types
import {InsertNewPost} from '.';

const PostContainer = forwardRef<InsertNewPost>((props, ref) => {
  //Get key to fetch comments.
  const getKey = useCallback((initialSize: number, previousData: any) => {
    if (previousData && previousData?.items?.length < 10) return null;
    return `/posts?page=${initialSize + 1}`;
  }, []);

  const {
    data: infinitePosts,
    error: infiniteError,
    mutate: mutatePosts,
    size,
    setSize,
  } = useSWRInfinite<any>(getKey, get, {
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

  //Check for available Posts
  const noMorePosts = useMemo(
    () => size * 10 >= infinitePosts?.[0]?.['total_count'],
    [size, infinitePosts],
  );

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
  if (!infinitePosts && !infiniteError)
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  return (
    <div className="sm:space-y-2">
      {/* Passing infintePosts to render on mutation */}
      <Posts infinitePosts={infinitePosts ?? []} toggleLike={toggleLike} />
      {!noMorePosts && (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="font-semibold text-primary"
            onClick={() => setSize((size) => size + 1)}
            disabled={noMorePosts}
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
