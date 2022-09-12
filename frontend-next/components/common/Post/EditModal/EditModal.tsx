import { useCallback, useState } from "react";
import { schemaEditPost } from "@api/posts/validation";
import { 
  Avatar,
  Button,
  Modal,
  ModalProps,
  TextArea
} from "@components/common";
import { XIcon } from "@heroicons/react/outline";
import { joiResolver } from "@hookform/resolvers/joi";
import { useUser } from "@hooks";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { get } from "utils/request";
import CausesTagBar from "../CausesTagBar/CausesTagBar";
import PostActionBar from "../PostActionBar/PostActionBar";
import { EditPostBodyType } from "@models/post";

const EditModal = ({
  isOpen = false,
  onClose = () => null,
  children,
  className,
}: ModalProps) => {
  const { user } = useUser();
  const router = useRouter();
  const { pid } = router.query;
  const { data: post, error: postError, mutate } = useSWR<any>(`/api/v2/posts/${pid}`, get, {
    onErrorRetry: (error) => {
      if (error?.response?.status === 500 && error?.response?.data?.error.startsWith("invalid input syntax for type uuid")) return
    }
  });

  const [file, setFile] = useState<any>(null);
  console.log("post ---->", post);

  const { handleSubmit, register, getValues, setValue, formState } = useForm({
    resolver: joiResolver(schemaEditPost),
    defaultValues: {
      content: post ? post.content : "",
      causes_tags: post ? post.causes_tags : "",
      link: post? post.link || "" : "",
    },
  })

  const onSubmit = useCallback(() => {
    const content = getValues('content');
    const causes_tags = getValues('causes_tags');
    const link = getValues('link');
    console.log({ content, causes_tags, link});

    const postEditBody: EditPostBodyType = { content, causes_tags: [causes_tags]};    
  }, [getValues]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} 
      // className={`${shareStep === 1 ? "bg-offWhite" : ""}`}
    >
      <span className='absolute right-3 cursor-pointer ' onClick={onClose}>
        <XIcon className='w-6' />
      </span>
      <Modal.Title>
        <h2 className="text-center min-h-[30px]">Edit Post</h2>
      </Modal.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Description>
        <div className="mt-2">
          <CausesTagBar
            src={user?.avatar?.url}
            preSelected={post && post.causes_tags[0]}
            register={register('causes_tags')}
            errorMessage={formState?.errors?.['causes_tags']?.message}
          />
          <div className="flex items-center -mr-6 -ml-6 p-4 space-x-4" >
            <Avatar src={user?.avatar?.url} size="m" />
            <span>{user?.first_name + " " + user?.last_name}</span>
          </div>
          <TextArea
            // placeholder='I feel like......'
            rows={4}
            containerClassName=" -mr-5 -ml-5"
            className='focus:border-none'
            errorMessage={formState?.errors?.['content']?.message}
            register={register("content")}
          />
        </div>
      </Modal.Description>
      <PostActionBar
        register={register('link')}
        errorMessage={formState?.errors?.['link']?.message}
        setFile={setFile}
      />      
      <Button
        className="max-w-xs ml-auto flex items-center justify-center align-middle mt-4 "
        type="submit"
        variant="fill"
        value="Submit"
        >
        Share Post
      </Button>
    </form>
    </Modal>
  );
};

export default EditModal;