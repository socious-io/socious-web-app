import DetailContent from '@components/common/Project/MainContent/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout, DetailLayout} from 'layout';
import {ProjectContextProvider} from 'components/common/Project/created/NewProject/context';
import {GetStaticProps, GetStaticPaths} from 'next';
import getGlobalData from 'services/cacheSkills';
import type {NextPage} from 'next';
import React from 'react';

type ProjectProps = {
  skills: any[];
};

const Detail: NextPage<ProjectProps> = ({skills}) => {
  return (
    <ProjectContextProvider>
      <GeneralLayout hasDetailNavbar detailNavbarTitle="Project details">
        <SideBar selectBar={'PROJECT_DETAIL'} />
        <DetailLayout>
          <DetailContent skills={skills} />
        </DetailLayout>
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default Detail;

export const getStaticProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}};
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: true};
};
