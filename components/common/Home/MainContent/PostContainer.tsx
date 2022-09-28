import Button from '@components/common/Button/Button';
import Posts from './Posts';
import {useState} from 'react';

const PostContainer = () => {
  const [page, setPage] = useState<number>(1);
  const posts = [];
  const [fullPost, setFullPost] = useState<boolean>(false);

  for (let i = 1; i <= page; i++) {
    posts.push(<Posts page={i} key={i} onFull={() => setFullPost(true)} />);
  }

  return (
    <div className="sm:space-y-2">
      <div className="space-y-10">{posts}</div>
      {!fullPost && (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="font-semibold text-primary"
            onClick={() => setPage(page + 1)}
            disabled={fullPost}
          >
            See more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostContainer;
