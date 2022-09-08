import { useRouter } from "next/router";
import useUser from "hooks/useUser/useUser";
import SideBar from "@components/common/Home/SideBar";
import { PostCard, SharedCard } from "layout/screen/PostCard";
import CommentField from "@components/common/Post/CommentField/CommentField";
import CommentsBox from "@components/common/Post/CommentsBox/CommentsBox";
import { Button, Modal } from "@components/common";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { get } from "utils/request";
import { createComment } from "@api/posts/comments/actions";
import { useSWRConfig } from "swr";

const Post = () => {
  const [page, setPage] = useState<number>(1);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { pid } = router.query;
  const comments = [];
  const { user } = useUser();
  
  const { data: post, error } = useSWR<any>(`/api/v2/posts/${pid}`, get);

  const onCommentSend = useCallback((content: string) => {
    if (!post?.id || !content) return

    createComment({ content }, post.id)
      .then(response => {
        console.log("response :------: |", response);
        for (let i = 1; i <= page; i++) {
          mutate(`/api/v2/posts/${post.id}/comments?page=${i}`)
        }
      }).catch(error => {
        console.error(error);
      })
  }, [post, mutate, page]);
  

  if (!post) {
    return <div>
            Loading!!!
          </div>
  };

  if (error?.response?.status === 404) return <h1>404</h1> ;

  for (let i = 1; i <= page; i++ ) {
    comments.push(<CommentsBox pid={post.id} page={i} key={i}/>);
  };

  console.log("post :----: ", post);
  

  return (
    <div className='flex mt-10 space-x-6'>
      <SideBar />
      <div className="w-full mb-10 space-y-6">
        {
          !!(post.shared_id) ?
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
            sharedPost={{...post.shared_post, identity_meta: post.shared_from_identity.meta}}
          />
          :
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
          />
        }
        <CommentField
          onSend={onCommentSend}
        />
        
        {/* <CommentsBox pid={pid as string} page={1} /> */}
        <div>
          {comments}
        </div>

        <div className="flex justify-center">
          <Button variant="link" className="text-primary font-semibold" onClick={() => setPage(page + 1)}>
            See more
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Post;