// Packages
import {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useReducer,
  memo,
} from 'react';

// Components
import CommentItem from 'layout/screen/CommentItem/CommentItem';
import Button from '@components/common/Button/Button';

// Hooks
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

// Types
import {InsertNewComment} from 'pages/app/post/[pid]';
import {IComment} from '@models/comment';
interface CommentsBoxProps {
  pid: string;
}

const CommentsBox = forwardRef<InsertNewComment, CommentsBoxProps>(
  ({pid}, ref) => {
    // For Force Update
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const {
      rawResponse: infiniteComments,
      seeMore,
      loadMore,
      isLoading,
      size,
      mutateInfinite: mutateComments,
    } = useInfiniteSWR<IComment>(pid ? `/posts/${pid}/comments` : null, {
      shouldRetryOnError: false,
      revalidateFirstPage: false,
    });

    useImperativeHandle(ref, () => ({
      setNewComment: (comment: IComment) => {
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
              for (let j = 0, len = oldComments[i].items.length; j < len; j++) {
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

    if (isLoading) <div>Loading....</div>;

    return (
      <div>
        {infiniteComments?.map((comments) =>
          comments?.items?.map((comment) => (
            <CommentItem
              key={comment.id}
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
              reported={comment?.reported}
              onLikeToggle={onCommentLikeToggle}
            />
          )),
        )}
        {seeMore && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="font-semibold text-primary"
              onClick={loadMore}
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

export default memo(CommentsBox);
