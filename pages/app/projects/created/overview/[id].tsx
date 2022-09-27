import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
const Overview = () => {
  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={'REVIEW'} />
      <DetailContent />
    </GeneralLayout>
  );
};

export default Overview;
