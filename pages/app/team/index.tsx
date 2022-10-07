import type {NextPage} from 'next';

import SideBar from '@components/common/Feed/SideBar';
import MainContent from '@components/common/Project/MainContent';
import {useToggle} from '@hooks';
import {GeneralLayout} from 'layout';
import TeamComponent from '@components/common/Organization/Team';

const Team: NextPage = () => {
  const {state: showSide, handlers: SeeSide} = useToggle();

  return (
    <GeneralLayout hasNavbar>
      <SideBar selectBar={showSide ? 'PROJECT_BACKBAR' : ''} />
      <TeamComponent />
    </GeneralLayout>
  );
};

export default Team;
