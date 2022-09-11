// import HomePostCard from "layout/screen/PostCard/HomePostCard";
import Button from "@components/common/Button/Button";
import { SharedCard, HomeCard} from "layout/screen/PostCard";
import useSWR from "swr";
import { get } from "utils/request";

const Posts = () => {

  const {data: posts, error: postsErrors, mutate: mutatePosts} = useSWR<any>("/api/v2/posts", get, {
    shouldRetryOnError: false,
    onErrorRetry: (error) => {
      if (error.response.status === 401) return
    }
  });
console.log("POST: ____", posts);
  return (
    <div className="space-y-2">
      <div className="space-y-10">
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
        {/* <HomeCard /> */}
        {/* <CommentedCard /> */}
        {/* <LikedCard /> */}
      </div>
      <div className="flex justify-center">
        <Button variant="link" className="text-primary font-semibold">
          See more
        </Button>
      </div>
    </div>
  );
};

export default Posts;