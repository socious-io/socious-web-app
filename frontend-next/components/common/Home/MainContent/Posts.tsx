// import HomePostCard from "layout/screen/PostCard/HomePostCard";
import Button from "@components/common/Button/Button";
import {CommentedCard, LikedCard, SharedCard, HomeCard} from "layout/screen/PostCard";

const Posts = () => {
  return (
    <div className="space-y-2">
      <HomeCard />
      <CommentedCard />
      <LikedCard />
      <SharedCard />
      <div className="flex justify-center">
        <Button variant="link" className="text-primary font-semibold">
          See more
        </Button>
      </div>
    </div>
  );
};

export default Posts;