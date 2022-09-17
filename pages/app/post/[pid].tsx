import {useRouter} from 'next/router';
import CommentField from '@components/common/Post/CommentField/CommentField';
import CommentsBox from '@components/common/Post/CommentsBox/CommentsBox';
import {Button, Modal, Notification} from '@components/common';
import {useCallback, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import {createComment} from '@api/posts/comments/actions';
import {useSWRConfig} from 'swr';
import ShareModalStep1 from '@components/common/Post/ShareModal/ShareModalStep1/ShareModalStep1';
import ShareModalStep2 from '@components/common/Post/ShareModal/ShareModalStep2/ShareModalStep2';
import {SharedCard, PostCard} from 'layout/screen/PostCard';
import SideBar from '@components/common/Home/SideBar';
import {useToggle, useUser} from '@hooks';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {SharePostBodyType} from '@models/post';
import {sharePost} from '@api/posts/actions';
import DeleteModal from '@components/common/Post/DeleteModal/DeleteModal';
import EditModal from '@components/common/Post/EditModal/EditModal';
import Toast from '@components/common/Toast/Toast';

// invalid input syntax for type uuid
const Post = () => {
  const router = useRouter();
  const {pid} = router.query;
  const {data: post, error} = useSWR<any>(`/posts/${pid}`, get, {
    onErrorRetry: (error) => {
      if (
        error?.response?.status === 500 &&
        error?.response?.data?.error.startsWith(
          'invalid input syntax for type uuid',
        )
      )
        return;
    },
  });

  const {user} = useUser();

  const [page, setPage] = useState<number>(1);
  const {mutate} = useSWRConfig();
  const {state: notify, handlers: notifyHandler} = useToggle();
  const {state: showShare, handlers: shareHandler} = useToggle();
  const {state: showEdit, handlers: editHandler} = useToggle();
  const {state: showDelete, handlers: deleteHandler} = useToggle();

  const [shareStep, setShareStep] = useState<number>(2);

  const onCommentSend = useCallback(
    (content: string) => {
      if (!post?.id || !content) return;
      createComment({content}, post.id)
        .then((response) => {
          for (let i = 1; i <= page; i++) {
            mutate(`/posts/${post.id}/comments?page=${i}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [post, mutate, page],
  );

  const onCopied = useCallback(() => {
    shareHandler.off();
    notifyHandler.on();
  }, [shareHandler, notifyHandler]);

  const onShare = useCallback(
    async (data?: SharePostBodyType) => {
      if (shareStep === 1) {
        setShareStep(2);
      } else if (data) {
        try {
          const response: any = await sharePost(data, post.id);
          // setShareStep(1);
          shareHandler.off();
          router.push(`/app/post/${response.id}`);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [post, router, shareStep, shareHandler],
  );

  const onOptionClicked = useCallback(
    (type: string) => {
      shareHandler.off();
      deleteHandler.off();
      editHandler.off();
      console.log('TYPE: ', type);
      switch (type) {
        case 'EDIT':
          console.log('[pid].tsx:- IT IS EDIT');
          editHandler.on();
          break;
        case 'SHARE':
          shareHandler.on();
          break;
        case 'DELETE':
          deleteHandler.on();
          break;
        default:
          console.log('[pid].tsx:- Ohh la. I am lost here.');
          break;
      }
    },
    [shareHandler, editHandler, deleteHandler],
  );

  const resetShareModal = useCallback(() => {
    shareHandler.off();
    setShareStep(2);
  }, [shareHandler]);

  if (!post) {
    return <div>Loading!!!</div>;
  }

  if (error?.response?.status === 404) return <h1>404</h1>;

  console.log('POST:---', post);

  const comments = [];
  for (let i = 1; i <= page; i++) {
    comments.push(<CommentsBox pid={post.id} page={i} key={i} />);
  }

  return (
    <div className="mt-10 flex space-x-6">
      <Toast
        onClose={notifyHandler.off}
        variant="copySuccess"
        isOpen={notify}
        text="Post link copied"
      />
      <SideBar />
      <div className="mb-10 w-full space-y-6">
        {!!post.shared_id ? (
          <SharedCard
            id={post.id}
            content={post.content}
            time={post.created_at}
            passion={post.causes_tags}
            name={post.identity_meta.name}
            src={post.identity_meta.image}
            shared={post.shared}
            liked={post.liked}
            likes={post.likes}
            sharedPost={{
              ...post.shared_post,
              identity_meta: post.shared_from_identity.meta,
            }}
            hideOption={user.id !== post.identity_id}
            optionClicked={onOptionClicked}
          />
        ) : (
          <PostCard
            id={post.id}
            name={post.identity_meta.name}
            content={post.content}
            time={post.created_at}
            passion={post.causes_tags}
            src={post.identity_meta.image}
            liked={post.liked}
            likes={post.likes}
            shared={post.shared}
            hideOption={user?.id !== post.identity_id}
            optionClicked={onOptionClicked}
          />
        )}
        <CommentField onSend={onCommentSend} />
        <div>{comments}</div>
        <div className="flex justify-center">
          <Button
            variant="link"
            className="font-semibold text-primary"
            onClick={() => setPage(page + 1)}
          >
            See more
          </Button>
        </div>

        {/* SHARE MODAL */}
        <Modal
          isOpen={showShare}
          onClose={resetShareModal}
          className={`${shareStep === 1 ? 'bg-offWhite' : ''}`}
        >
          <span
            className="absolute right-3 cursor-pointer "
            onClick={resetShareModal}
          >
            <XMarkIcon className="w-6" />
          </span>
          <Modal.Title>
            <h2 className="min-h-[30px] text-center">
              {shareStep === 1 ? '' : 'Share Post'}
            </h2>
          </Modal.Title>
          {/* {
            shareStep === 1 && <ShareModalStep1 onCopied={onCopied} onShare={onShare}/>
          } */}
          {shareStep === 2 && <ShareModalStep2 onShare={onShare} />}
        </Modal>

        {user.id === post.identity_id && (
          <>
            {/* EDIT MODAL */}
            <EditModal
              isOpen={showEdit}
              onClose={editHandler.off}
              pid={post?.id}
            />

            {/* DELETE MODAL */}
            <DeleteModal
              pid={post?.id}
              isOpen={showDelete}
              onClose={deleteHandler.off}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
