import type {NextPage} from 'next';

import SideBar from '@components/common/Feed/SideBar';
import MainContent from '@components/common/Feed/MainContent';
import {useToggle} from '@hooks';
import {GeneralLayout, DetailLayout} from 'layout';
const Project: NextPage = () => {
  const {state: showSide, handlers: SeeSide} = useToggle();

  return (
    <GeneralLayout hasNavbar>
      <SideBar />
      <DetailLayout>
        <MainContent />
      </DetailLayout>
    </GeneralLayout>
  );
};

export default Project;
