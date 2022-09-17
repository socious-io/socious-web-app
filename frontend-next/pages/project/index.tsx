import type {NextPage} from 'next';

import SideBar from '@components/common/Home/SideBar';
import MainContent from 'layout/screen/Project/MainContent';

const ImgUrl = require('../../asset/images/project.png');

const Project: NextPage = () => {
  return (
    <div className=" mx-6 mt-10 flex md:space-x-6">
      <SideBar />
      <MainContent />
    </div>
  );
};

export default Project;
