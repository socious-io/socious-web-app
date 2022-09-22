import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';

const Overview = () => {
  return (
    <div className="mt-10 flex md:space-x-6">
      <SideBar selectBar={'REVIEW'} />
      <DetailContent />
    </div>
  );
};

export default Overview;
