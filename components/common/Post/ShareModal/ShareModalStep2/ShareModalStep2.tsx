import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';
import {joiResolver} from '@hookform/resolvers/joi';
import {useForm} from 'react-hook-form';
import useSWR from 'swr';

import {Modal, TextArea, Button, Avatar} from 'components/common';
import PostActionBar from 'components/common/Post/PostActionBar/PostActionBar';
import CausesTagBar from 'components/common/Post/CausesTagBar/CausesTagBar';

import {useUser} from 'hooks';
import {schemaSharePost} from '@api/posts/validation';
import {PostCard, SharedCard} from 'layout/screen/PostCard';
import {get} from 'utils/request';
import {uploadMedia} from '@api/media/actions';
import {SharePostBodyType} from '@models/post';

interface shareModalStep2Props {
  onShare: (data: SharePostBodyType) => void;
}

export const ShareModalStep2 = ({onShare}: shareModalStep2Props) => {
  const router = useRouter();
  const {pid} = router.query;
  const {data: post, error} = useSWR<any>(`/posts/${pid}`, get, {
    onErrorRetry: (error) => {
      if (
        error?.response?.status === 500 &&
        error?.response?.data?.error?.startsWith(
          'invalid input syntax for type uuid',
        )
      )
        return;
    },
  });

  const {user} = useUser();
  const [file, setFile] = useState<string>('');

  const {register, handleSubmit, formState, getValues} = useForm({
    resolver: joiResolver(schemaSharePost),
  });

  const onSubmit = useCallback(async () => {
    let fileId = '';
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        console.log('FORMDATA', formData);
        const response: any = await uploadMedia(formData);
        fileId = response?.id;
      } catch (error) {
        console.error(error);
        return;
      }
    }
    let postData: SharePostBodyType = {};
    const socialCauses = getValues('causes_tags');
    const content = getValues('content');
    // const link = getValues("link");
    if (socialCauses) postData.causes_tags = [socialCauses];
    if (content) postData.content = content;
    if (fileId) postData.media = [fileId];
    // if (link) postData.link = link;

    onShare(postData);
  }, [getValues, onShare, file]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Description>
        <div className="mt-2">
          <CausesTagBar
            src={user?.avatar?.url}
            register={register('causes_tags')}
            errorMessage={formState?.errors?.['causes_tags']?.message}
          />
          <div className="-mr-6 -ml-6 flex items-center space-x-4 p-4">
            <Avatar src={user?.avatar?.url} size="m" />
            <span>{user?.first_name + ' ' + user?.last_name}</span>
          </div>
          <TextArea
            placeholder="I feel like......"
            rows={4}
            containerClassName=" -mr-5 -ml-5"
            className="focus:border-none"
            errorMessage={formState?.errors?.['content']?.message}
            register={register('content')}
          />
          {!!post.shared_id ? (
            <div className="relative mt-4 space-y-5 rounded-2xl border border-grayLineBased bg-white p-4">
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
                showAction={false}
                sharedPost={{
                  ...post.shared_post,
                  identity_meta: post.shared_from_identity.meta,
                }}
              />
            </div>
          ) : (
            <div className="mt-4">
              <PostCard
                id={post.id}
                name={post.identity_meta.name}
                content={post.content}
                time={post.created_at}
                passion={post.causes_tags}
                src={post.identity_meta.image}
                liked={post.liked}
                likes={post.likes}
                showAction={false}
                shared={post.shared}
              />
            </div>
          )}
        </div>
      </Modal.Description>
      <PostActionBar
        register={register('link')}
        errorMessage={formState?.errors?.['link']?.message}
        setFile={setFile}
      />
      <Button
        className="ml-auto mt-4 flex max-w-xs items-center justify-center align-middle "
        type="submit"
        // size="lg"
        variant="fill"
        value="Submit"
      >
        Share Post
      </Button>
    </form>
  );
};

export default ShareModalStep2;
