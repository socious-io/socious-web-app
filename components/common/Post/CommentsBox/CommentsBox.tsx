// Packages
import {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useReducer,
} from 'react';
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
    // For Force Update
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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
      revalidateFirstPage: false,
    });

    const noMoreMessage = useMemo(
      () => size * 10 >= infiniteComments?.[0]?.['total_count'],
      [size, infiniteComments],
    );

    useImperativeHandle(ref, () => ({
      setNewComment: (comment: any) => {
        console.log('NEW COMMENT :---: ', comment);
        mutateComments(
          (oldComments) => {
            oldComments?.[0]?.items.unshift(comment);
            return oldComments;
          },
          {revalidate: false},
        );
        forceUpdate();
      },
    }));

    // This is to mutate 'Like' on "Comment" without revalidating.
    const onCommentLikeToggle = useCallback(
      (commentId: string, liked: boolean) => {
        mutateComments(
          (oldComments) => {
            if (!oldComments) return [];
            for (let i = 0; i < size; i++) {
              let comments = oldComments[i].items;
              for (let j = 0, len = oldComments[i].limit; j < len; j++) {
                let oldComment = comments[j];
                //if likeToggled Comment, change the value.
                comments[j] =
                  oldComment.id === commentId
                    ? {
                        ...oldComment,
                        liked: liked,
                        likes: liked
                          ? oldComment.likes + 1
                          : oldComment.likes - 1,
                      }
                    : oldComment;
              }
              oldComments[i].items = comments;
            }
            return oldComments;
          },
          {revalidate: false},
        );
        forceUpdate();
      },
      [mutateComments, size],
    );

    if (!infiniteComments && !infiniteError) <div>Loading....</div>;

    return (
      <div>
        {infiniteComments?.map((comments) => (
          <div key={comments.page}>
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
                key={comment.id}
                onLikeToggle={onCommentLikeToggle}
              />
            ))}
          </div>
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
