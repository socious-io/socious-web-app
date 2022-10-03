import React, {useState} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Home/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';
import CreateProjectMain from '@components/common/Project/created/NewProject';
import {ProjectContextProvider} from 'components/common/Project/created/NewProject/context';

const ProjectApplications: NextPage = () => {
  return (
    <ProjectContextProvider>
      <GeneralLayout hasNavbar>
        <SideBar />
        <MyApplicationBoxes />
        <CreateProjectMain />
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default ProjectApplications;
