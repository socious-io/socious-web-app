import type {NextPage} from 'next';

import SideBar from '@components/common/Feed/SideBar';
import MainContent from '@components/common/Project/MainContent';
import {useToggle} from '@hooks';
import {GeneralLayout, DetailLayout} from 'layout';
const Project: NextPage = () => {
  const {state: showSide, handlers: SeeSide} = useToggle();

  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={showSide ? 'PROJECT_BACKBAR' : ''} />
      <DetailLayout>
        <MainContent onClickShow={SeeSide.on} />
      </DetailLayout>
    </GeneralLayout>
  );
};

export default Project;
