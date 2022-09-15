import ImgUrl from "../../../../asset/images/socious_feed.png";
import Avatar from "@components/common/Avatar/Avatar";
import Button from "@components/common/Button/Button";

interface AddPostProps {
  onClickAdd: () => void
}

const AddPost = ({ onClickAdd }: AddPostProps) => {
  return (
    <>
      <div
        className="bg-clearWhite bg-cover pt-11 pb-7 h-[7.5rem] sm:h-[8.5rem] px-4 space-y-2 rounded-2xl bg-center bg-blend-overlay"
        style={{ backgroundImage: `url(${ImgUrl})`}}
        >
        <h1 className='text-4xl text-white'>
          Your Feed
        </h1>
        <p className='text-base text-neutralGray font-normal'>
          See what is happening in your network
        </p>
      </div>

      <div className='flex p-6 space-x-4 rounded-2xl border border-grayLineBased bg-white'>
        <Avatar size="xl" />
        <Button variant='outline' className='grow px-6 py-3 rounded-2xl border border-grayLineBased text-primary' onClick={onClickAdd}>
          Create a post
        </Button>
      </div>
    </>
  );
};

export default AddPost;
