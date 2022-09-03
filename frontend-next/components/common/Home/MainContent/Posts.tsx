import PostCard from "layout/screen/PostCard/PostCard";
import Button from "@components/common/Button/Button";

const Posts = () => {
  return (
    <div className="space-y-2">
      { [...Array(5)].map((item) => {
        return <PostCard key={item} />
      })
      }
      <div className="flex justify-center">
        <Button variant="link" className="text-primary font-semibold">
          See more
        </Button>
      </div>
    </div>
  );
};

export default Posts;