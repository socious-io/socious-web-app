import SideBar from '@components/common/Home/SideBar';
import DetailContent from '@components/common/Project/MainContent/DetailContent';

const Detail = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailContent />
    </div>
  );
};

export default Detail;
