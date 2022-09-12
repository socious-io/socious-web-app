import Button from "@components/common/Button/Button";
import { SharedCard, HomeCard } from "layout/screen/PostCard";
import useSWR from "swr";
import { get, post } from "utils/request";

interface PostsProps {
  page: number,
  onFull: () => void,
}

const Posts = ({
  page,
  onFull,
}: PostsProps) => {

  const {data: posts, error: postsErrors} = useSWR<any>(page ? `/api/v2/posts?page=${page}` : null, get, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onErrorRetry: (error) => {
      if (error?.response?.status === 401) return
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
};

export default Posts;