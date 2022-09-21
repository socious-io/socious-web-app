import HiredContent from '@components/common/Project/created/hiredContent';
import SideBar from '@components/common/Project/SideBar/SideBar';

const Hired = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <HiredContent />
    </div>
  );
};

export default Hired;
