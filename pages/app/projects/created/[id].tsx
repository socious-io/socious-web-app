import React, {useState} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Home/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';
import CreateProjectMain from '@components/common/Project/created/NewProject';
import {ProjectContextProvider} from 'components/common/Project/created/NewProject/context';
import {GetStaticProps} from 'next';
import getGlobalData from 'services/cacheSkills';
type ProjectApplicationsProps = {
  skills: any[];
};

const ProjectApplications: NextPage<ProjectApplicationsProps> = ({skills}) => {
  return (
    <ProjectContextProvider>
      <GeneralLayout hasNavbar>
        <SideBar />
        <MyApplicationBoxes />
        <CreateProjectMain skills={skills} />
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default ProjectApplications;

export const getServerSideProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}};
};
