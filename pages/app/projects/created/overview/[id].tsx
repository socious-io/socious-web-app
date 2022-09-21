import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';

const Overview = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailContent />
    </div>
  );
};

export default Overview;
