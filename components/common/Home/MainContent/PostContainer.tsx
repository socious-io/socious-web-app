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

  const noMorePosts = useMemo(
    () => size * 10 >= infinitePosts?.[0]?.['total_count'],
    [size, infinitePosts],
  );

  if (!infinitePosts && !infiniteError)
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <GridLoader color="#36d7b7" />
      </div>
    );

  return (
    <div className="sm:space-y-2">
      <Posts infinitePosts={infinitePosts ?? []} />
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
