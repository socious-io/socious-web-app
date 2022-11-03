import {useRouter} from 'next/router';
import useSWR from 'swr';

// Components
import {ProjectContextProvider} from '@components/common/Project/created/NewProject/context';
import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
import SplashScreen from 'layout/Splash';

// Services/Utils
import {get} from 'utils/request';
import getGlobalData from 'services/cacheSkills';

// Types
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {ProjectProps} from '../../[id]';
import {Project} from '@models/project';

const Overview: NextPage<ProjectProps> = ({skills}) => {
  const router = useRouter();
  const {id} = router.query;
  const {data} = useSWR<Project>(`/projects/${id}`, get);

  if (!data) return <SplashScreen />;

  return (
    <ProjectContextProvider>
      <GeneralLayout hasDetailNavbar detailNavbarTitle="Project Overview">
        <SideBar data={data} />
        <DetailContent project={data} rawSkills={skills} />
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default Overview;

export const getStaticProps: GetStaticProps = async () => {
  const skills = await getGlobalData();
  return {props: {skills}};
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: true};
};
