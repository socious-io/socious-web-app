import DetailContent from '@components/common/Project/MainContent/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
const Detail = () => {
  return (
    <GeneralLayout hasDetailNavbar>
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailContent />
    </GeneralLayout>
  );
};

export default Detail;
