import HiredContent from '@components/common/Project/created/hiredContent';
import SideBar from '@components/common/Project/SideBar/SideBar';

const Hired = () => {
  return (
    <div className=" mt-10 flex md:space-x-6">
      <SideBar selectBar={'HIRE'} />
      <HiredContent />
    </div>
  );
};

export default Hired;
