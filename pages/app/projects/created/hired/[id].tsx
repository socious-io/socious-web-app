import HiredContent from '@components/common/Project/created/hiredContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';

const Hired = () => {
  return (
    <GeneralLayout>
      <SideBar selectBar={'HIRE'} />
      <HiredContent />
    </GeneralLayout>
  );
};

export default Hired;
