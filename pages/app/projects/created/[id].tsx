import React, {useState} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Home/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';
import CreateProjectMain from '@components/common/Project/created/NewProject';

const ProjectApplications: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <GeneralLayout hasNavbar>
      <SideBar />
      <MyApplicationBoxes onchange={() => setIsOpen(true)} />
      <CreateProjectMain onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </GeneralLayout>
  );
};

export default ProjectApplications;
