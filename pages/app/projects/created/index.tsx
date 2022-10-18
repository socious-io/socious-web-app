import React, {useEffect} from 'react';
import type {NextPage} from 'next';
import {GeneralLayout} from 'layout';
import SideBar from '@components/common/Feed/SideBar';
import MyApplicationBoxes from '@components/common/Project/created';
import CreateProjectMain from '@components/common/Project/created/NewProject';
import {ProjectContextProvider} from 'components/common/Project/created/NewProject/context';
import {GetStaticProps, GetStaticPaths} from 'next';
import getGlobalData from 'services/cacheSkills';
import useUser from 'hooks/useUser/useUser';
import Router from 'next/router';

type ProjectApplicationsProps = {
  skills: any[];
};

const ProjectApplications: NextPage<ProjectApplicationsProps> = ({skills}) => {
  const {currentIdentity} = useUser({redirect: false});
  useEffect(() => {
    if (currentIdentity?.type === 'users') Router.push('/app/projects');
  }, [currentIdentity?.type]);

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

export const getStaticProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}, revalidate: 60 * 60};
};
