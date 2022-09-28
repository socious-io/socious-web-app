import type {NextPage} from 'next';

import SideBar from '@components/common/Home/SideBar';
import MainContent from '@components/common/Project/MainContent';
import {useToggle} from '@hooks';
import {GeneralLayout} from 'layout';
const Project: NextPage = () => {
  const {state: showSide, handlers: SeeSide} = useToggle();

  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={showSide ? 'PROJECT_BACKBAR' : ''} />
      <MainContent onClickShow={SeeSide.on} />
    </GeneralLayout>
  );
};

export default Project;
