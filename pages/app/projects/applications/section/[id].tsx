import SideBar from '@components/common/Feed/SideBar';
import DetailContent from '@components/common/Project/MyApplication/DetailContent';

const Section = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailContent />
    </div>
  );
};

export default Section;
