import {useRouter} from 'next/router';
import useSWR from 'swr';
import {ProjectContextProvider} from '@components/common/Project/created/NewProject/context';
import DetailContent from '@components/common/Project/created/DetailContent';
import SideBar from '@components/common/Project/SideBar/SideBar';
import {GeneralLayout} from 'layout';
import SplashScreen from 'layout/Splash';
import {get} from 'utils/request';
import {skillsFetcher} from 'services/cacheSkills';
import type {NextPage} from 'next';
import {Project, ProjectProps} from '@models/project';
import {TQuestionsResponse} from '@models/question';
import {Skill} from '@components/common/Search/Providers/SkillsProvider';
import {useEffect, useState} from 'react';

const Overview: NextPage<ProjectProps> = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data} = useSWR<Project>(`/projects/${id}`, get);

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    skillsFetcher().then(setSkills);
  }, []);

  const {data: questions} = useSWR<TQuestionsResponse>(
    data?.id ? `/projects/${data.id}/questions` : null,
    get,
  );

  if (!data) return <SplashScreen />;

  return (
    <ProjectContextProvider>
      <GeneralLayout hasDetailNavbar detailNavbarTitle="Project Overview">
        <SideBar data={data} />
        <DetailContent
          project={data}
          rawSkills={skills}
          questions={questions?.questions?.sort(
            (x, y) => Date.parse(x.created_at) - Date.parse(y.created_at),
          )}
        />
      </GeneralLayout>
    </ProjectContextProvider>
  );
};

export default Overview;
