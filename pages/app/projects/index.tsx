import type {NextPage} from 'next';

import SideBar from '@components/common/Home/SideBar';
import MainContent from '@components/common/Project/MainContent';
import {useToggle} from '@hooks';

const Project: NextPage = () => {
  const {state: showSide, handlers: SeeSide} = useToggle();

  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar selectBar={showSide ? 'PROJECT_BACKBAR' : ''} />
      <MainContent onClickShow={SeeSide.on} />
    </div>
  );
};

export default Project;
