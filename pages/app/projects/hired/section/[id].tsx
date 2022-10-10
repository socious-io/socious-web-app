import SideBar from '@components/common/Feed/SideBar';
import DetailContent from '@components/common/Project/HiredProjects/DetailContent';

const HiredProject = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailContent />
    </div>
  );
};

export default HiredProject;
