import SideBar from '@components/common/Home/SideBar';
import DetailContent from 'layout/screen/Project/DetailContent';

const Detail = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailContent />
    </div>
  );
};

export default Detail;
