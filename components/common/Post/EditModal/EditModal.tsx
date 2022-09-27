import {useCallback, useState} from 'react';
import {schemaEditPost} from '@api/posts/validation';
import {Avatar, Button, Modal, ModalProps, TextArea} from '@components/common';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {joiResolver} from '@hookform/resolvers/joi';
import {useUser} from '@hooks';
import {FieldValues, useController, useForm} from 'react-hook-form';
import useSWR from 'swr';
import {get} from 'utils/request';
import CausesTagBar from '../CausesTagBar/CausesTagBar';
import PostActionBar from '../PostActionBar/PostActionBar';
import {EditPostBodyType} from '@models/post';
import {uploadMedia} from '@api/media/actions';
import {editPost} from '@api/posts/actions';
import {PostCard} from 'layout/screen/PostCard';

interface EditModalProps extends ModalProps {
  pid: string;
}

const EditModal = ({
  isOpen = false,
  onClose = () => null,
  pid,
}: EditModalProps) => {
  const {user} = useUser();
  const {
    data: post,
    error: postError,
    mutate,
  } = useSWR<any>(pid ? `/posts/${pid}` : null, get, {
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

  const [file, setFile] = useState<any>(null);

  const {handleSubmit, register, getValues, control, formState} = useForm({
    resolver: joiResolver(schemaEditPost),
    defaultValues: {
      content: post ? post.content : '',
      causes_tags: post ? post.causes_tags?.[0] : '',
      link: post ? post.link || '' : '',
    } as FieldValues,
  });
  const causesTagsController = useController<FieldValues, string>({
    name: 'causes_tags',
    control,
  });

  const onSubmit = useCallback(async () => {
    const content = getValues('content');
    const causes_tags = getValues('causes_tags');
    const link = getValues('link');

    let fileId = '';
    if (file) {
      try {
        // Image upload feature is not working.
        const formData = new FormData();
        formData.append('file', file);
        const response: any = await uploadMedia(formData);
        fileId = response?.id;
      } catch (error) {
        console.error(error);
        return;
      }
    }

    const postEditBody: EditPostBodyType = {
      content,
      causes_tags: [causes_tags],
    };
    try {
      await editPost(postEditBody, post.id);
      onClose();
      mutate();
    } catch (error) {
      console.error(error);
    }
  }, [getValues, file, post, onClose, mutate]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // className={`${shareStep === 1 ? "bg-offWhite" : ""}`}
      className=""
    >
      <span className="absolute right-3 cursor-pointer " onClick={onClose}>
        <XMarkIcon className="w-6" />
      </span>
      <Modal.Title>
        <h2 className="font-worksans text-center">Edit Post</h2>
      </Modal.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Description>
          <div className="mt-2">
            <CausesTagBar
              src={user?.avatar?.url}
              controller={causesTagsController}
            />
            <TextArea
              rows={post?.shared_id ? 6 : 10}
              containerClassName=" -mr-5 -ml-5 mt-4"
              className="focus:border-none"
              errorMessage={formState?.errors?.['content']?.message}
              register={register('content')}
            />
          </div>
          {!!post?.shared_id && (
            <PostCard
              id={post.shared_from_identity.meta.id}
              name={post.shared_from_identity.meta.name}
              content={post.shared_post.content}
              time={post.shared_post.created_at}
              passion={post.shared_post.causes_tags}
              src={post.shared_from_identity.meta.avatar}
              liked={post.shared_post.liked}
              likes={post.shared_post.likes}
              showAction={false}
              shared={post.shared_post.shared}
            />
          )}
        </Modal.Description>
        <PostActionBar
          register={register('link')}
          errorMessage={formState?.errors?.['link']?.message}
          setFile={setFile}
        />
        <Button
          className="ml-auto mt-4 flex max-w-xs items-center justify-center align-middle "
          type="submit"
          variant="fill"
          value="Submit"
        >
          Save post
        </Button>
      </form>
    </Modal>
  );
};

export default EditModal;
