import React, {useState} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Home/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';
import {Modal, Button} from '@components/common';

const ProjectApplications: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <GeneralLayout hasNavbar>
      <SideBar />
      <MyApplicationBoxes />
    </GeneralLayout>
  );
};

export default ProjectApplications;
