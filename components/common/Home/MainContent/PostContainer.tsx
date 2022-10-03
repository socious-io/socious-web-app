import Button from '@components/common/Button/Button';
import Posts from './Posts';
import {useCallback, useMemo, useState} from 'react';

import useSWRInfinite from 'swr/infinite';
import {get} from 'utils/request';
import {GridLoader} from 'react-spinners';

const PostContainer = () => {
  //Get key to fetch comments.
  const getKey = useCallback((initialSize: number, previousData: any) => {
    if (previousData && previousData?.items?.length < 10) return null;
    console.log('I was called');
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
};

export default PostContainer;
