import {useCallback, forwardRef} from 'react';
import CommentItem from 'layout/screen/CommentItem/CommentItem';
import useSWR from 'swr';
import {get} from 'utils/request';
import {useSWRConfig} from 'swr';
import useSWRInfinite from 'swr/infinite';

import {InsertNewComment} from 'pages/app/post/[pid]';
import Button from '@components/common/Button/Button';
import {useMemo} from 'react';

interface CommentsBoxProps {
  pid: string;
}

const CommentsBox = forwardRef<InsertNewComment, CommentsBoxProps>(
  ({pid}, ref) => {
    //Get key to make comments.
    const getKey = useCallback(
      (initialSize: number, previousData: any) => {
        if (!pid || (previousData && previousData?.items?.length < 10))
          return null;
        return `/posts/${pid}/comments?page=${initialSize + 1}`;
      },
      [pid],
    );

    const {
      data: infiniteComments,
      error: infiniteError,
      mutate: mutateComments,
      size,
      setSize,
    } = useSWRInfinite<any>(getKey, get, {
      shouldRetryOnError: false,
    });
    const {data: comments, error} = useSWR<any>(
      pid ? `/posts/${pid}/comments` : null,
      get,
    );

    const noMoreMessage = useMemo(
      () => size * 10 >= infiniteComments?.[0]?.['total_count'],
      [size, infiniteComments],
    );

    if (!comments?.items) {
      <> ERROR </>;
    }

    console.log('Infinite Comments :---: ', infiniteComments);

    return (
      <div>
        {infiniteComments?.map((comments) => (
          <>
            {comments?.items?.map((comment: any) => (
              <CommentItem
                className=" border-b-[0.5px] border-[#C3C8D9]"
                id={comment?.id}
                post_id={comment?.post_id}
                identity={{
                  ...comment?.identity_meta,
                  identity_type: comment?.identity_type,
                }}
                content={comment?.content}
                liked={comment?.liked}
                likes={comment?.likes}
                time={comment?.created_at}
                key={comment.id ?? comment.name}
              />
            ))}
          </>
        ))}
        {!noMoreMessage && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="font-semibold text-primary"
              onClick={() => setSize(size + 1)}
            >
              See more
            </Button>
          </div>
        )}
      </div>
    );
  },
);

CommentsBox.displayName = 'CommentBox';

export default CommentsBox;
