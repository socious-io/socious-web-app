// Packages
import {useCallback, forwardRef, useImperativeHandle, useMemo} from 'react';
import useSWRInfinite from 'swr/infinite';

// Methods/Services
import {get} from 'utils/request';

// Components
import CommentItem from 'layout/screen/CommentItem/CommentItem';
import Button from '@components/common/Button/Button';

// Types
import {InsertNewComment} from 'pages/app/post/[pid]';
interface CommentsBoxProps {
  pid: string;
}

const CommentsBox = forwardRef<InsertNewComment, CommentsBoxProps>(
  ({pid}, ref) => {
    //Get key to fetch comments.
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

    const noMoreMessage = useMemo(
      () => size * 10 >= infiniteComments?.[0]?.['total_count'],
      [size, infiniteComments],
    );

    useImperativeHandle(ref, () => ({
      setNewComment: (comment: any) => {
        mutateComments(
          (oldComments) => {
            oldComments?.[0]?.items.unshift(comment);
            return oldComments;
          },
          {revalidate: false},
        );
      },
    }));

    if (!infiniteComments && !infiniteError) <div>Loading....</div>;

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
