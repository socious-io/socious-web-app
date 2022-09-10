import Button from "@components/common/Button/Button";
import {SharedCard, HomeCard} from "layout/screen/PostCard";
import { useState } from "react";
import useSWR from "swr";
import { get, post } from "utils/request";
import { bool } from "yup";

interface AllPostType {
  page: number,
  onFull: () => void,
}

const AllPost = ({
  page,
  onFull,
}: AllPostType) => {

  const {data: posts, error: postsErrors} = useSWR<any>(`/api/v2/posts?page=${page}`, get, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onErrorRetry: (error) => {
      if (error.response.status === 401) return
    }
  });

  if ( posts && posts.total_count && (page * 10) >= posts.total_count ) {
    onFull();
  }
  return <>
  {
    posts?.items?.map((post: any) => {
      return !!(post.shared_id) ?
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
      <HomeCard
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
    })
  }
  </> 
}

const Posts = () => {
  const [page, setPage] = useState<number>(1);
  const posts = [];
  const [fullPost, setFullPost] = useState<boolean>(false);

  for (let i = 1; i <= page; i++ ) {
    posts.push(<AllPost page={i} key={i} onFull={() => setFullPost(true)}/>);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-10">
        {posts}
      </div>
      {
        !fullPost &&
        <div className="flex justify-center">
          <Button
            variant="link"
            className="text-primary font-semibold"
            onClick={() => setPage(page + 1)}
            disabled={fullPost}
            >
            See more
          </Button>
        </div>
      }
    </div>
  );
};

export default Posts;