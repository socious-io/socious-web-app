import AddPost from './AddPost';
import Posts from './Posts';

const MainContent = () => {
  return (
    <div className="w-full mb-10 space-y-6">
      <AddPost />
      <Posts />
    </div>
  );
};

export default MainContent;