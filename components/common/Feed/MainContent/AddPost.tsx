import ImgUrl from '../../../../asset/images/socious_feed.png';
import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';

interface AddPostProps {
  onClickAdd: () => void;
}

const AddPost = ({onClickAdd}: AddPostProps) => {
  return (
    <>
      <div
        className="hidden flex-col space-y-2 space-x-2 rounded-2xl bg-clearWhite bg-cover bg-center px-4 pt-11 pb-7 bg-blend-overlay md:flex"
        style={{backgroundImage: `url(${ImgUrl})`}}
      >
        <h1 className="text-4xl text-white">Your Feed</h1>
        <p className="text-base font-normal text-neutralGray">
          See what is happening in your network
        </p>
      </div>

      <div className="flex justify-center space-x-4 rounded-2xl border border-grayLineBased bg-white p-4 sm:flex sm:p-6">
        <Avatar size="xl" />
        <Button
          variant="outline"
          className="grow rounded-2xl border border-grayLineBased px-6 py-3 text-primary"
          onClick={onClickAdd}
        >
          Create a post
        </Button>
      </div>
    </>
  );
};

export default AddPost;
