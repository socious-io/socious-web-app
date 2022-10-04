import DetailContent from '@components/common/Project/MainContent/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout, DetailLayout} from 'layout';
const Detail = () => {
  return (
    <GeneralLayout hasDetailNavbar detailNavbarTitle="Project details">
      <SideBar selectBar={'PROJECT_DETAIL'} />
      <DetailLayout>
        <DetailContent />
      </DetailLayout>
    </GeneralLayout>
  );
};

export default Detail;
